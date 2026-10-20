declare module 'd3-org-chart' {
  export type OrgChartNode<T> = {
    data: T;
    x: number;
    y: number;
    width: number;
    height: number;
    parent?: OrgChartNode<T>;
    children?: OrgChartNode<T>[];
    _children?: OrgChartNode<T>[];
  };

  export class OrgChart<T = Record<string, unknown>> {
    container(value: string | Element): this;
    data(value: T[]): this;
    svgHeight(value: number): this;
    initialExpandLevel(value: number): this;
    nodeWidth(value: (node: OrgChartNode<T>) => number): this;
    nodeHeight(value: (node: OrgChartNode<T>) => number): this;
    childrenMargin(value: (node: OrgChartNode<T>) => number): this;
    siblingsMargin(value: (node: OrgChartNode<T>) => number): this;
    compactMarginPair(value: (node: OrgChartNode<T>) => number): this;
    compactMarginBetween(value: (node: OrgChartNode<T>) => number): this;
    compact(value: boolean): this;
    duration(value: number): this;
    nodeContent(value: (node: OrgChartNode<T>) => string): this;
    onNodeClick(value: (node: OrgChartNode<T>) => void): this;
    onExpandOrCollapse(value: (node: OrgChartNode<T>) => void): this;
    nodeEnter(value: (this: SVGGElement, node: OrgChartNode<T>) => void): this;
    nodeUpdate(value: (this: SVGGElement, node: OrgChartNode<T>) => void): this;
    linkUpdate(value: (this: SVGPathElement, node: OrgChartNode<T>) => void): this;
    render(): this;
    fit(options?: { animate?: boolean; scale?: boolean }): this;
    zoomIn(): this;
    zoomOut(): this;
    expandAll(): this;
    collapseAll(): this;
  }
}
