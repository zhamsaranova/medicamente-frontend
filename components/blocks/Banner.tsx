import classNames from "classnames";
import { Property } from "csstype";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import MouseImage from "../../assets/mouse.svg";
import styles from "../../styles/components/blocks/Banner.module.scss";
import ArrowButton from "../elements/ArrowButton";
import Button from "../elements/Button";
import Header from "../elements/Header";
import { swipeConfidenceThreshold, swipePower, wrap } from "../elements/Slider";
import useWindowFocus from "../hooks/useWindowFocus";
import Container from "../layout/Container";

const textVariants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

export interface Title {
  name?: string;
  description?: string;
  image?: string | StaticImageData;
  alt?: string;
  link?: string;
  buttonText?: string;
  position?: "left" | "center";
  objectPosition?: Property.ObjectPosition<string | number>;
  serviceName?: string;
  price?: number;
  oldPrice?: number;
  pricePrefix?: string;
  onButtonClick?: () => void;
  arrow?: boolean;
  topText?: string;
}

const Slide = ({
  index,
  realIndex,
  titles,
  width,
}: {
  index: number;
  realIndex: number;
  titles: Title[];
  width?: number;
}) => {
  const title = titles[realIndex];
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      style={{ transform: `translateX(${index * (width ?? 0)}px)` }}
      className={styles.slide}>
      {title.image && (
        <Image
          draggable={false}
          className={classNames({ [styles.show]: loaded })}
          style={{ objectFit: "cover", objectPosition: title.objectPosition }}
          fill
          src={title.image}
          alt={title.alt ?? "Баннер"}
          onLoadingComplete={() => {
            setLoaded(true);
          }}
        />
      )}
    </div>
  );
};

export interface BannerProps {
  titles: Title[];
  showMoreLink?: string;
}

function Banner({ titles, showMoreLink }: BannerProps) {
  const focus = useWindowFocus();

  const [[index, direction, offset], setIndex] = useState([0, 1, 0]);
  const [dragging, setDragging] = useState(false);
  const widthRef = useRef<HTMLDivElement>(null);
  const [slideWidth, setSlideWidth] = useState(0);
  const [animating, setAnimating] = useState(false);
  const animationControls = useAnimationControls();

  const titleRealIndex = wrap(0, titles.length, index);
  const leftTitleRealIndex = wrap(0, titles.length, index - 1);
  const rightTitleRealIndex = wrap(0, titles.length, index + 1);

  const title = titles[titleRealIndex];

  const paginate = (dir: number) => {
    if (!animating) {
      let i = index + dir;
      setIndex([i, i > index ? -1 : 1, 0]);
    }
  };

  const prevIndex = useRef<number>();
  useEffect(() => {
    prevIndex.current = index;
  }, [index]);

  useEffect(() => {
    if (!dragging && titles.length > 1 && focus) {
      let id = setInterval(() => {
        paginate(1);
      }, 5000);

      return () => clearInterval(id);
    }
  }, [index, titles, dragging, focus, paginate]);

  useEffect(() => {
    animationControls.start(
      {
        x: -index * (slideWidth ?? 0),
      },
      prevSlideWidth.current != slideWidth ? { duration: 0 } : undefined,
    );
  }, [animationControls, index, slideWidth]);

  useEffect(() => {
    const setWidth = () => {
      if (widthRef.current) setSlideWidth(widthRef.current.clientWidth);
    };
    setWidth();

    window.addEventListener("resize", setWidth);
    return () => window.removeEventListener("resize", setWidth);
  }, [widthRef]);

  const prevSlideWidth = useRef<number>();
  useEffect(() => {
    prevSlideWidth.current = slideWidth;
  }, [slideWidth]);

  return (
    <Container id={"banner"}>
      {title && (
        <div
          className={classNames(styles.banner, "cursor-common")}
          ref={widthRef}>
          <AnimatePresence mode={"wait"}>
            <motion.header
              className={classNames(styles[title?.position ?? "left"], {
                [styles.big]: title?.price,
              })}
              key={index}
              initial={"hidden"}
              animate={"show"}
              exit={"hidden"}>
              <motion.div layout variants={textVariants} className={styles.top}>
                {title.topText}
              </motion.div>
              <motion.div layout variants={textVariants}>
                <Header l={"h1"}>{title.name}</Header>
              </motion.div>
              <motion.div
                layout
                variants={textVariants}
                className={styles.slideDescription}>
                {title.serviceName && (
                  <span className={styles.serviceName}>
                    {title.serviceName}
                  </span>
                )}
                <summary
                  className={classNames({
                    [styles.reduced]: title.serviceName,
                  })}>
                  {title.description}
                </summary>
              </motion.div>
              {title.price && (
                <motion.div
                  layout
                  variants={textVariants}
                  className={styles.prices}>
                  {title.oldPrice && (
                    <s className={styles.oldPrice}>{title.oldPrice} ₽</s>
                  )}
                  <div>
                    {title.pricePrefix && (
                      <span className={styles.pricePrefix}>
                        {title.pricePrefix}{" "}
                      </span>
                    )}
                    <span className={styles.price}>{title.price}</span>
                    <span className={styles.money}> ₽</span>
                  </div>
                </motion.div>
              )}
              <motion.div
                layout
                variants={textVariants}
                className={styles.buttonContainer}>
                {title.buttonText && (
                  <Button
                    as={title.link ? "link" : "button"}
                    arrow={title.arrow ?? true}
                    href={title.link}
                    onClick={title.onButtonClick}
                    className={classNames(styles.button, "cursor-pointer")}>
                    {title.buttonText}
                  </Button>
                )}
              </motion.div>
            </motion.header>
          </AnimatePresence>
          <div
            className={classNames(
              styles.overlay,
              styles[title.position ?? "left"],
            )}
          />
          <AnimatePresence
            initial={false}
            mode={"sync"}
            custom={[direction, offset, slideWidth]}>
            <motion.div
              className={styles.slides}
              animate={animationControls}
              transition={{
                duration: 1,
              }}
              onAnimationStart={() => setAnimating(true)}
              onAnimationComplete={() => setAnimating(false)}
              onDragStart={() => setDragging(true)}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  let i = index + 1;
                  setIndex([i, -1, offset.x]);
                } else if (swipe > swipeConfidenceThreshold) {
                  let i = index - 1;
                  setIndex([i, 1, offset.x]);
                } else {
                  animationControls.start({
                    x: -index * (slideWidth ?? 0),
                  });
                }

                setDragging(false);
              }}
              drag={!animating && titles.length > 1 ? "x" : false}>
              {titles.length > 1 && (
                <Slide
                  index={index - 1}
                  realIndex={leftTitleRealIndex}
                  titles={titles}
                  width={slideWidth}
                  key={leftTitleRealIndex}
                />
              )}
              <Slide
                index={index}
                realIndex={titleRealIndex}
                titles={titles}
                width={slideWidth}
                key={titleRealIndex}
              />
              {titles.length > 1 && (
                <Slide
                  index={index + 1}
                  realIndex={rightTitleRealIndex}
                  titles={titles}
                  width={slideWidth}
                  key={rightTitleRealIndex}
                />
              )}
            </motion.div>
          </AnimatePresence>
          {/*<div className={styles.nav}>*/}
          {/*    {titles.length > 1 && titles.map((e, i) =>*/}
          {/*        <div key={i}>*/}
          {/*            <div className={classNames({[styles.active]: i == titleRealIndex})}></div>*/}
          {/*        </div>*/}
          {/*    )}*/}
          {/*</div>*/}
          {titles.length > 1 && (
            <div className={classNames(styles.navButtons)}>
              <ArrowButton
                className={"cursor-pointer"}
                reduced
                aria-label={"Предыдущий слайд"}
                role={"navigation"}
                left
                onClick={() => paginate(-1)}
              />
              <ArrowButton
                className={"cursor-pointer"}
                reduced
                aria-label={"Следующий слайд"}
                role={"navigation"}
                onClick={() => paginate(1)}
              />
            </div>
          )}
          {showMoreLink && (
            <div className={classNames(styles.more)}>
              <Link
                href={showMoreLink}
                className={classNames(styles.content, "cursor-pointer")}>
                <Image src={MouseImage} alt={"Скролл"} />
                <span>Узнать больше</span>
              </Link>
            </div>
          )}
        </div>
      )}
    </Container>
  );
}

export default Banner;
