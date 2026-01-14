import { useContext } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionHeader,
} from "../../components/Accordion";
import { ProductDetailContext } from "./contexts";

const ProductInfo = () => {
  const [product] = useContext(ProductDetailContext);
  const { info } = product;

  return (
    <Accordion>
      {info.map((infoItem) => (
        <AccordionItem key={infoItem.title} id={infoItem.title}>
          <AccordionHeader>{infoItem.title}</AccordionHeader>
          <AccordionContent>
            <ul className="ml-4 pl-2 list-disc">
              {infoItem.description.map((descItem) => (
                <li key={descItem} className="text-neutral-600">
                  {descItem}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default ProductInfo;
