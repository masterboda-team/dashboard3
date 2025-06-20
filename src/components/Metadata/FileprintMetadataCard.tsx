import { MetadataInput } from "@dashboard/graphql";
import { Accordion, Box, Skeleton, Text } from "@saleor/macaw-ui-next";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";

import { DashboardCard } from "../Card";

export interface FileprintMetadataCardProps {
  data: MetadataInput[];
}

export const FileprintMetadataCard: React.FC<FileprintMetadataCardProps> = ({ data }) => {
  const [expanded, setExpanded] = useState<string | undefined>(undefined);

  const hash = data?.find(m => m.key === "hash")?.value ?? "";
  const fileExtension = data?.find(m => m.key === "extension")?.value ?? "";
  const fileLink = `/media/${hash}/${hash}`;
  const coloredPagesList = data?.find(m => m.key === "coloredPages")?.value ?? "";
  const coverTextColor = data?.find(m => m.key === "coverTextColor")?.value ?? "";

  return (
    <DashboardCard paddingTop={6}>
      <DashboardCard.Content>
        <Accordion value={expanded} onValueChange={setExpanded}>
          <Accordion.Item data-test-id="metadata-item" value="metadata-accordion">
            <Accordion.Trigger>
              <Box display="flex" flexDirection="column" gap={2}>
                <Text size={5} fontWeight="bold">
                  Fileprint Metadata
                </Text>
                {data?.length > 0 && (
                  <Text size={2} color="default2">
                    <FormattedMessage
                      id="2+v1wX"
                      defaultMessage="{number,plural,one{{number} string} other{{number} strings}}"
                      description="number of metadata fields in model"
                      values={{
                        number: data.length,
                      }}
                    />
                  </Text>
                )}

                {data?.length === 0 && (
                  <Text size={2} color="default2">
                    <FormattedMessage
                      id="kAPaN6"
                      defaultMessage="Empty"
                      description="empty metadata text"
                    />
                  </Text>
                )}
              </Box>

              <Accordion.TriggerButton dataTestId="expand" />
            </Accordion.Trigger>
            <Accordion.Content>
              {data === undefined ? (
                <Skeleton />
              ) : (
                <Box display="grid" gap={2} paddingBottom={6} paddingTop={6}>
                  <Text>
                    File link:{" "}
                    <a
                      style={{ textDecoration: "underline", color: "blue" }}
                      href={fileLink}
                      target="_blank"
                      rel="noreferrer"
                      download={hash + fileExtension}
                    >
                      {hash}
                    </a>
                  </Text>
                  <Text>File extension: {fileExtension}</Text>
                  <Text>Colored Pages: {coloredPagesList}</Text>
                  <Text>
                    Text Color: <span style={{ color: coverTextColor }}>{coverTextColor}</span>
                  </Text>
                </Box>
              )}
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </DashboardCard.Content>
    </DashboardCard>
  );
};
