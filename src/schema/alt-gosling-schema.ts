import type { ChannelDeep, ChannelValue, ChannelTypes, DataDeep, Mark, Assembly, Layout, Orientation } from './gosling.schema';

/**
 * Values in the form of JSON.
 * Same as in gosling.js
*/
export interface Datum {
    [k: string]: number | string;
}

export type AltCounter = {
    nTracks: number;
    rowViews: number;
    colViews: number;
    allPositions: number[][];
    totalRows: number;
    totalCols: number;
    matrix: number[][];
}

export type AltParentValues = {
    layout: 'linear' | 'circular';
    arrangement: 'parallel' | 'serial' | 'horizontal' | 'vertical';
    alignment: 'singular' | 'stack' | 'overlay';
    data?: DataDeep;
    mark?: Mark;
}

export type AltEncodingSeparated = {
    encodingDeepGenomic: EncodingDeepSingle[];
    encodingDeepQuantitative: EncodingDeepSingle[];
    encodingDeepNominal: EncodingDeepSingle[];
    encodingValue: EncodingValueSingle[];
}

export type EncodingDeepSingle = {
    name: keyof typeof ChannelTypes;
    description: string;
    details: ChannelDeep;
}

export type EncodingValueSingle = {
    name: keyof typeof ChannelTypes;
    description: string;
    details: ChannelValue;
}

export type AltTrackPositionDetails = {
    trackNumber: number;
    rowNumber: number;
    colNumber: number;
}

export type AltTrackAppearanceDetails = {
    overlaid: false;
    layout: Layout;
    mark: Mark;
    encodings: AltEncodingSeparated;
    encodingsDescList: string[][];
    orientation?: Orientation;
    assembly?: Assembly;
}

export type AltTrackAppearanceDetailsOverlaid = {
    overlaid: true;
    layout: Layout;
    mark: Mark[];
    encodings: AltEncodingSeparated;
    encodingsByMark: AltEncodingSeparated[];
    encodingsDescList: string[][];
    orientation?: Orientation;
    assembly?: Assembly;
}

export interface AltTrackDataFields {
    genomicField?: string;
    valueField?: string;
    categoryField?: string;
}

export interface AltTrackDataDetails {
    data: DataDeep;
    fields: AltTrackDataFields;
    dataStatistics?: AltDataStatistics;
}

export interface AltTrackPosition {
    description: string;
    details: AltTrackPositionDetails;
}

export interface AltTrackAppearance {
    description: string;
    details: AltTrackAppearanceDetails;
}

export interface AltTrackAppearanceOverlaid {
    description: string;
    details: AltTrackAppearanceDetailsOverlaid;
}

export interface AltTrackData {
    description: string;
    details: AltTrackDataDetails;
}

export interface AltTrackOverlaidByDataInd {
    description: string;
    charttype?: string;
    appearance: AltTrackAppearance;
    data: AltTrackData;
}

export interface AltTrackBase {
    alttype: 'single' | 'ov-mark' | 'ov-data';
    description: string;
    title?: string;
    position: AltTrackPosition;
}


export interface AltTrackSingle extends AltTrackBase {
    alttype: 'single';
    uid: string;
    charttype?: string;
    appearance: AltTrackAppearance;
    data: AltTrackData;
}

export interface AltTrackOverlaidByMark extends AltTrackBase {
    alttype: 'ov-mark';
    uid: string;
    charttype?: string[];
    appearance: AltTrackAppearanceOverlaid;
    data: AltTrackData;
}

export interface AltTrackOverlaidByData extends AltTrackBase {
    alttype: 'ov-data';
    uids: string[];
    appearance: {details: {layout: Layout}};
    tracks: AltTrackOverlaidByDataInd[];
}

export type AltTrackOverlaid = AltTrackOverlaidByMark | AltTrackOverlaidByData;

export type AltTrack = AltTrackSingle | AltTrackOverlaid;

export interface AltDataStatistics {
    id: string;
    flatTileData: Datum[];
    genomicMin?: number;
    genomicMax?: number;
    // genomicMinRel?: GenomicPosition;
    // genomicMaxRel?: GenomicPosition;
    valueMin?: number;
    valueMax?: number;
    valueMinGenomic?: number[];
    valueMaxGenomic?: number[];
    // valueMinGenomicRel?: GenomicPosition[];
    // valueMaxGenomicRel?: GenomicPosition[];
    categories?: string[];
    categoryMinMaxWG?: { [key: string]: (number | number[])[] };
    highestCategory?: string[];
}

export type compositionTracker = {
    nRows: number;
    nCols: number;
    allVertical: boolean;
    allHorizontal: boolean;
    everyRowSameCols: boolean;
    RowsCols: number[]
}

export type AltSpecComposition = {
    description: string;
    nTracks: number;
    parentValues: AltParentValues;
    counter: AltCounter;
}

export type AltGoslingSpec = {
    title?: string;
    subtitle?: string;
    alt: string;
    longDescription: string;
    composition: AltSpecComposition;
    tracks: Array<AltTrack>
}


// export interface AltAttributes {
//     arrangement: 'parallel' | 'serial' | 'horizontal' | 'vertical';
//     alignment: 'stack' | 'overlay';
// }

export interface PreviewAlt {
    id: string;
    data: AltGoslingSpec;
}