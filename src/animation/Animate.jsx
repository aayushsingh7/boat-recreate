import { motion, useAnimation, useInView } from "framer-motion";
import React, { useEffect, useRef } from "react";

const Animate = ({
    shrink,
    children,
    type,
    overflowHidden,
    delay,
    width,
    ...styling
}) => {
    const ref = useRef(null);
    const isVisible = useInView(ref, { once: true });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isVisible) {
            mainControls.start("visible");
        }
    }, [isVisible]);

    const topToBottom = {
        hidden: { opacity: 0, y: -75 },
        visible: { opacity: 1, y: 0 },
    };

    const bottomToTop = {
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 },
    };

    const rightToLeft = {
        hidden: { opacity: 0, x: 75 },
        visible: { opacity: 1, x: 0 },
    };

    const leftToRight = {
        hidden: { opacity: 0, x: -75 },
        visible: { opacity: 1, x: 0 },
    };

    const variants =
        type == "topToBottom"
            ? topToBottom
            : type == "bottomToTop"
                ? bottomToTop
                : type == "rightToLeft"
                    ? rightToLeft
                    : type == "leftToRight"
                        ? leftToRight
                        : {};



    return (
        <div
            ref={ref}
            style={{
                position: "relative",
                flexShrink: shrink ? "none" : "0",
                margin: "0 !important",
                padding: "0 !important",
                overflow: overflowHidden ? "hidden" : "none",
                width: width ? width : "auto",
            }}
        >
            <motion.div
                ref={ref}
                variants={variants}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.5, delay: delay ? delay : 0 }}
                style={{ display: "flex", width: width ? width : "auto", ...styling }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default Animate;
