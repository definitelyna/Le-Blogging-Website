import { Card, CardContent } from "@mui/material";

interface SimpleCardProps {
  children: React.ReactNode;
  cardSx?: object;
  contentSx?: object;
}

export default function SimpleCard({
  children,
  cardSx,
  contentSx,
}: SimpleCardProps) {
  return (
    <Card
      sx={{
        boxShadow: "none",
        borderRadius: 2,
        border: "1px solid #EDEEF2",
        ...cardSx,
      }}
    >
      <CardContent sx={contentSx}>{children}</CardContent>
    </Card>
  );
}
