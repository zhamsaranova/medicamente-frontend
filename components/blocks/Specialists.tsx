import classNames from "classnames";
import { AnimatePresence } from "framer-motion";
import { useRef } from "react";
import styles from "../../styles/components/blocks/Specialists.module.scss";
import { IExpert } from "../../types/expert.type";
import HeaderWithButtons from "../elements/HeaderWithButtons";
import MobileSliderNav from "../elements/MobileSliderNav";
import Slider, { SliderRef, paginate, wrap } from "../elements/Slider";
import SpecialistCard from "../elements/SpecialistCard";
import useWindowDimensions from "../hooks/useWindowDimensions";
import Container from "../layout/Container";

export interface SpecialistsProps {
  canExpand?: boolean;
  specialists?: IExpert[];
}

function Specialists({ specialists }: SpecialistsProps) {
  const slider = useRef<SliderRef>(null);
  const { width } = useWindowDimensions();
  const pageSize = (width ?? 1000) > 500 ? 4 : 1;

  const disableNav = true;
  const oneSpec = specialists?.length == 1;

  return (
    <Container id={"specialists"} className={styles.specialists}>
      <HeaderWithButtons
        hideButtons={disableNav}
        onPaginate={(d) => slider.current?.paginate(d)}>
        Наши специалисты
      </HeaderWithButtons>
      {specialists && (
        <ul className={classNames(styles.list, { [styles.one]: oneSpec })}>
          <Slider disabled={disableNav} ref={slider}>
            {(page, dragging) => (
              <AnimatePresence mode={"popLayout"} initial={false}>
                {paginate(
                  specialists,
                  pageSize,
                  wrap(0, Math.ceil(specialists.length / pageSize), page),
                ).map((s, i) => (
                  <div key={i}>
                    <SpecialistCard
                      expand={oneSpec}
                      size={"small"}
                      smallSlug={s.slug}
                      slug={!oneSpec ? s.slug : undefined}
                      ignoreClick={dragging}
                      info={s}
                    />
                  </div>
                ))}
              </AnimatePresence>
            )}
          </Slider>
          <MobileSliderNav
            hideButtons={disableNav}
            onPaginate={(d) => slider.current?.paginate(d)}
          />
        </ul>
      )}
    </Container>
  );
}

export default Specialists;
