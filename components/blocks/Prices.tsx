import classNames from "classnames";
import { useRef } from "react";
import styles from "../../styles/components/blocks/Prices.module.scss";
import { IPrice } from "../../types/price.type";
import Header from "../elements/Header";
import Container from "../layout/Container";

export interface PricesProps {
  priceList?: IPrice[];
}

const PriceListItem = ({ item }: { item: IPrice }) => {
  return (
    <li className={classNames(styles.item, styles.price)}>
      <header>
        <span>{item?.name}</span>
        <div className={styles.right}>
          {item?.oldPrice && (
            <var className={classNames(styles.p, styles.discount)}>
              {item?.oldPrice} ₽
            </var>
          )}
          <var className={styles.p}>{item?.price} ₽</var>
        </div>
      </header>
    </li>
  );
};

const Prices = ({ priceList }: { priceList: IPrice[] }) => {
  const containerRef = useRef<HTMLUListElement>(null);

  return (
    <Container className={styles.prices} id={"smooth-prices"}>
      <Header l={"h2"}>Цены</Header>
      <ul className={classNames(styles.list, styles.root)} ref={containerRef}>
        {priceList?.map((e, i) => (
          <PriceListItem item={e} key={i} />
        ))}
      </ul>
    </Container>
  );
};

export default Prices;
