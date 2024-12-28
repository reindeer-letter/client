import { ComponentType, useCallback } from "react";
import InfiniteLoader from "react-window-infinite-loader";
import { ListChildComponentProps, FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

interface IInfiniteWrapperProps<T> {
  children: ComponentType<ListChildComponentProps>;
  hasMore: boolean;
  fetchMore: () => void;
  data: T[];
}

export default function InfiniteWrapper<T>({
  children,
  hasMore,
  data,
  fetchMore,
}: IInfiniteWrapperProps<T>) {
  const itemCount = hasMore ? data.length + 1 : data.length;
  const loadMoreItems = useCallback(() => {
    fetchMore();
  }, [fetchMore]);

  const isItemLoaded = useCallback(
    (index: number) => {
      // false일 때 fetchMore 호출: 다음 페이지가 존재하고, index <= data.length 일 때
      // true일 때 fetchMore 호출하지 않음, 컴포넌트만 렌더링: 다음 페이지가 존재하지 않거나, index > data.length 일 때
      return !hasMore || index < data.length;
    },
    [hasMore, data.length],
  );

  return (
    <AutoSizer>
      {({ height, width }) => (
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={itemCount}
          loadMoreItems={loadMoreItems}
        >
          {({ onItemsRendered, ref }) => (
            <FixedSizeList
              height={height}
              itemCount={data?.length || 0}
              itemSize={242}
              itemData={data}
              width={width}
              onItemsRendered={onItemsRendered}
              ref={ref}
            >
              {children}
            </FixedSizeList>
          )}
        </InfiniteLoader>
      )}
    </AutoSizer>
  );
}
