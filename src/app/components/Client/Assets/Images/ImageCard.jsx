import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/utilUI/ui/card";
import Image from "next/image";

const ImageCard = ({ image }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{image.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Image src={image.url} width={300} height={300} alt={image.title} />
      </CardContent>
    </Card>
  );
};

export default ImageCard;
