"use client";

import { trpc } from "@/trpc/client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface CategoriesSectionProps {
  categoryId?: string;
}

/**
 * 设计原因：
 * 配合 useSuspenseQuery 使用，提供声明式的加载状态管理
 * 当数据还在加载时，自动显示 fallback UI
 * 避免了传统的 isLoading 状态判断，代码更简洁
 */
export const CategoriesSection = ({ categoryId }: CategoriesSectionProps) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary fallback={<div>Error...</div>}>
        <CategoriesSectionSuspense categoryId={categoryId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const CategoriesSectionSuspense = ({ categoryId }: CategoriesSectionProps) => {
  const [categories] = trpc.categories.getMany.useSuspenseQuery();
  return <div>CategoriesSection: {JSON.stringify(categories)}</div>;
};
