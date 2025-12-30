"use client";

import React from "react";
import { Spinner } from "../ui/spinner";
import { motion } from "motion/react";

function LargeLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "linear" }}
      // transition={{ type: 'spring' }}
      className="flex flex-row gap-3 border bg-card p-3 rounded-md shadow-md justify-center items-center opacity-0"
    >
      <Spinner size={"small"} />
      <p className="text-md text-bold">Loading ...</p>
    </motion.div>
  );
}

export default LargeLoader;
