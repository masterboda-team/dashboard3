import { extensionMountPoints } from "@dashboard/extensions/extensionMountPoints";
import { useExtensions } from "@dashboard/extensions/hooks/useExtensions";
import { Box, List, sprinkles, Text } from "@saleor/macaw-ui-next";
import React from "react";
import { Link } from "react-router-dom";

import { SidebarMenuItem } from "./types";
import { getMenuItemExtension, isMenuActive } from "./utils";

interface Props {
  menuItem: SidebarMenuItem;
}

export const SingleItem: React.FC<Props> = ({ menuItem }) => {
  const extensions = useExtensions(extensionMountPoints.NAVIGATION_SIDEBAR);
  const active = isMenuActive(location.pathname, menuItem);
  const handleMenuItemClick = () => {
    const extension = getMenuItemExtension(extensions, menuItem.id);

    if (extension) {
      extension.open();
    }

    if (menuItem.onClick) {
      menuItem.onClick();
    }
  };

  return (
    <List.Item
      borderRadius={3}
      paddingX={2}
      active={active}
      onClick={handleMenuItemClick}
      data-test-id={`menu-item-label-${menuItem.id}`}
      position="relative"
    >
      <Link
        to={menuItem.url || ""}
        replace={active}
        className={sprinkles({
          display: "block",
          width: "100%",
        })}
      >
        <Box
          className={sprinkles({
            paddingY: 1.5,
            gap: 3,
            display: "flex",
            alignItems: "center",
          })}
        >
          {menuItem.icon}
          <Text size={3} fontWeight="medium">
            {menuItem.label}
          </Text>
        </Box>
      </Link>
      {menuItem.endAdornment && (
        <Box position="absolute" right={2} zIndex={"3"}>
          {menuItem.endAdornment}
        </Box>
      )}
    </List.Item>
  );
};
