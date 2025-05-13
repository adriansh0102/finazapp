import GridShape from "@/components/common/GridShape";

import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

export default function UnauthorizedComponent() {
  const { t } = useTranslation();
  return (
    <>
      <GridShape />
      <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
        <h1 className="mb-8 font-bold text-gray-800 text-title-md dark:text-white/90 xl:text-title-2xl">
          {t('unauthorized')}
        </h1>

       
        <p className="mt-10 mb-6 text-base text-gray-700 dark:text-gray-400 sm:text-lg">
        {t('no_permission')}
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
          >
          {t('back_to_dashboard')}
        </Link>
      
    </div>
          </>
  );
}
