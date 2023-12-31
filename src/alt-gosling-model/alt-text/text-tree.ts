import type { AltGoslingSpec, AltTrackSingle } from '@alt-gosling/schema/alt-gosling-schema';

import { arrayToString, markToText, channelToText, capDesc } from '../util';


export function addTreeDescriptions(altGoslingSpec: AltGoslingSpec) {
    addTrackPositionDescriptions(altGoslingSpec);
    addTrackAppearanceDescriptions(altGoslingSpec);
}

function addTrackPositionDescriptions(altGoslingSpec: AltGoslingSpec) {
    if (altGoslingSpec.composition.nTracks == 1) {
        altGoslingSpec.tracks[0].position.description = 'This is the only track.';
        if (altGoslingSpec.tracks[0].alttype === 'single') {
            altGoslingSpec.composition.description = 'There is one (' + altGoslingSpec.tracks[0].appearance.details.layout + ') track.';
        } else {
            altGoslingSpec.composition.description = 'There is one (overlaid) track.';
        }
    } else if (altGoslingSpec.composition.nTracks == 2) {
        addTrackPositionDescriptionsTwo(altGoslingSpec);
    } else {
        addTrackPositionDescriptionsMulti(altGoslingSpec);
    }
}


function addTrackPositionDescriptionsTwo(altGoslingSpec: AltGoslingSpec) {
    let firstPlace = '';
    let secondPlace = '';
    let desc = '';

    if (altGoslingSpec.tracks[0].appearance.details.layout === 'circular' && altGoslingSpec.tracks[1].appearance.details.layout === 'circular') {
        
        switch(altGoslingSpec.composition.parentValues.arrangement) {
            case 'serial':
                firstPlace = 'left half of ring';
                secondPlace = 'right half of ring';
                desc = 'Two circular tracks form one ring, with both the half of the ring.';
                break;
            case 'parallel':
                firstPlace = 'outer ring';
                secondPlace = 'inner ring';
                desc = 'Two circular tracks form two rings, one around the other.';
                break;
            case 'horizontal':
                firstPlace = 'left';
                secondPlace = 'right';
                desc = 'Two circular tracks are shown next to each other.';
                break;
            default:
                firstPlace = 'top';
                secondPlace = 'bottom';
                desc = 'Two circular tracks are shown below each other.';
        }
    } else {
        const bothLinear = altGoslingSpec.tracks[0].appearance.details.layout === altGoslingSpec.tracks[1].appearance.details.layout;
        switch(altGoslingSpec.composition.parentValues.arrangement) {
            case 'serial' || 'horizontal':
                firstPlace = 'left';
                secondPlace = 'right';
                desc = ' are shown next to each other.';
                break;
            default:
                firstPlace = 'top';
                secondPlace = 'bottom';
                desc = 'are shown below each other.';
        }
        if (bothLinear) {
            desc = ''.concat('Two linear tracks ', desc);
        } else {
            desc = ''.concat('One linear and one circular track ', desc);
        }
    }
    altGoslingSpec.tracks[0].position.description = 'This track is shown on the ' + firstPlace + '.';
    altGoslingSpec.tracks[1].position.description = 'This track is shown on the ' + secondPlace + '.';
    altGoslingSpec.composition.description = desc;
}


function addTrackPositionDescriptionsMulti(altGoslingSpec: AltGoslingSpec) {
    const positionWords = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth'];

    let desc = '';
    if (altGoslingSpec.composition.counter.totalRows === 1) {
        // all horizontal
        desc = desc.concat('There are ' + (altGoslingSpec.composition.counter.nTracks) + ' tracks, displayed next to each other.');

    } else if (altGoslingSpec.composition.counter.totalCols === 1) {
        // all vertical
        desc = desc.concat('There are ' + (altGoslingSpec.composition.counter.nTracks) + ' tracks, displayed below each other.');
    }

    else {
        desc = desc.concat('There are ' + (altGoslingSpec.composition.counter.nTracks) + ' tracks.');
        desc = desc.concat(' There are ' + (altGoslingSpec.composition.counter.totalRows) + ' rows.');

        const rowLengths = Object.keys(altGoslingSpec.composition.counter.matrix).map(t => Object.keys(altGoslingSpec.composition.counter.matrix[t as unknown as number]).length);
        const rowLengthsUnique = [...new Set(rowLengths)];
   
        if (rowLengthsUnique.length == 1) {
            desc = desc.concat(' Each row has ' + rowLengthsUnique[0] + ' tracks next to each other');
        } else if (rowLengthsUnique.length == 2) {
            const rowsWithFirstLength = [] as number[];
            const rowsWithSecondLength = [] as number[];
            for(let i = 0; i < rowLengths.length; i++) {
                if (rowLengths[i] === rowLengthsUnique[0]) {
                    rowsWithFirstLength.push(i);
                } else {
                    rowsWithSecondLength.push(i);
                }
            }
            if (0 in rowsWithFirstLength) {
                desc = desc.concat(' Row(s) ' + arrayToString(rowsWithFirstLength.map(t => t+1)) + ' have ' + rowLengthsUnique[0] + ' column(s) each.');
                desc = desc.concat(' The other rows have ' + rowLengthsUnique[1] + ' column(s) each.');
            } else {
                desc = desc.concat(' Row(s) ' + arrayToString(rowsWithSecondLength.map(t => t+1)) + ' have ' + rowLengthsUnique[1] + ' column(s) each.');
                desc = desc.concat(' The other rows have ' + rowLengthsUnique[0] + ' column(s) each.');
            }
        }
        else {
            for (let i = 0; i < altGoslingSpec.composition.counter.totalRows; i++) {
                if (i > 9) {
                    desc = desc.concat(' Row number ' + i + ' has ' + altGoslingSpec.composition.counter.matrix[i].length + ' track(s) next to each other.');
                } else {
                    desc = desc.concat(' The ' + positionWords[i] + ' row has ' + altGoslingSpec.composition.counter.matrix[i].length + ' track(s) next to each other.');
                }
            }
        }
    }

    // add the description to altGoslingSpec
    altGoslingSpec.composition.description = desc;

    // if only 1 row / 1 column, dont do this
    for (const i in altGoslingSpec.tracks) {
        let descTrack = '';
        const trackPosition = altGoslingSpec.tracks[i].position.details;
        const counter = altGoslingSpec.composition.counter;

        // indication of row is only useful if there is more than 1 row
        if (altGoslingSpec.composition.counter.totalRows > 1) {
            if (trackPosition.rowNumber === 0) {
                descTrack = descTrack.concat('top row');
            } else if (trackPosition.rowNumber === counter.totalRows - 1) {
                descTrack = descTrack.concat('bottom row');
            } else if (trackPosition.rowNumber < 10) {
                descTrack = descTrack.concat(positionWords[trackPosition.rowNumber] + ' row');
            } else {
                descTrack = descTrack.concat('row ' + trackPosition.rowNumber + 1);
            }
        }
        // indication of column is only useful if there is more than 1 row
        if (altGoslingSpec.composition.counter.totalCols > 1) {
            if (descTrack.length > 1) {
                descTrack = descTrack.concat(', ');
            }
            if (counter.matrix[trackPosition.rowNumber].length > 1) {
                if (trackPosition.colNumber === 1) {
                    descTrack = descTrack.concat('left');
                } else if (trackPosition.colNumber === counter.matrix[trackPosition.rowNumber].length) {
                    descTrack = descTrack.concat('right');
                } else if (trackPosition.colNumber === 2 && counter.matrix[trackPosition.rowNumber].length === 3) {
                    descTrack = descTrack.concat('middle');
                } else {
                    descTrack = descTrack.concat(positionWords[trackPosition.colNumber] + ' from left');
                }
            }
        }
        altGoslingSpec.tracks[i].position.description = descTrack;
    }
}




function addTrackAppearanceDescriptions(altGoslingSpec: AltGoslingSpec) {
    for (const i in altGoslingSpec.tracks) {
        const track = altGoslingSpec.tracks[i];

        if (track.alttype === 'single') {
            let desc = '';

            if (track.charttype) {
                desc = desc.concat(capDesc(track.charttype) + '.');
            } else {
                desc = desc.concat('Chart with ' + markToText.get(track.appearance.details.mark) + '.');
            }
    
            const encodingDescriptions = addEncodingDescriptions(track);
            // console.log('encdesc', encodingDescriptions);

            desc = desc.concat(' ' + encodingDescriptions.desc);
        
            track.appearance.description = desc;
            track.appearance.details.encodingsDescList = encodingDescriptions.descList;
        } else if (track.alttype === 'ov-mark') {
            track.appearance.details.encodingsDescList = [[]];
        } else {
            // fill in later
        }
    }
}


function addEncodingDescriptions(track: AltTrackSingle) {
    const mark = track.appearance.details.mark as string;
    
    let descGenomic = '';
    let descQuantitative = '';
    let descNominal = '';
    let descValue = '';

    const descList = [] as string[][];

    // genomic encodings
    const genomicEncodingsI = track.appearance.details.encodings.encodingDeepGenomic.map(o => o.name);
    if (genomicEncodingsI.includes('x') && genomicEncodingsI.includes('y')) {
        descGenomic = descGenomic.concat('The genome is shown on both the x- and y-axes.');
        if (genomicEncodingsI.includes('xe') && genomicEncodingsI.includes('ye')) {
            descGenomic = descGenomic.concat(' Each displays genomic intervals.');
            descList.push(['x', 'The x-axis show genomic intervals.']);
            descList.push(['y', 'The y-axis show genomic intervals.']);
        } else if (genomicEncodingsI.includes('xe')) {
            descGenomic = descGenomic.concat(' The genome on the x-axis displays genomic intervals.');
            descList.push(['x', 'The x-axis show genomic intervals.']);
            descList.push(['y', 'The y-axis shows the genome.']);

        } else if (genomicEncodingsI.includes('ye')) {
            descGenomic = descGenomic.concat(' The genome on the y-axis displays genomic intervals.');
            descList.push(['x', 'The x-axis shows the genome.']);
            descList.push(['y', 'The y-axis show genomic intervals.']);
        } else {
            descList.push(['x', 'The x-axis shows the genome.']);
            descList.push(['y', 'The y-axis shows the genome.']);
        }
    } else {
        if (genomicEncodingsI.includes('x')) {
            let add = '';
            if (genomicEncodingsI.includes('xe')) {
                add = 'in intervals';
                descList.push(['x', 'The x-axis show genomic intervals.']);
            } else {
                descList.push(['x', 'The x-axis shows the genome.']);
            }
            descGenomic = descGenomic.concat('The genome is shown ' + add + ' on the x-axis.');
        }

        if (genomicEncodingsI.includes('y')) {
            let add = '';
            if (genomicEncodingsI.includes('ye')) {
                add = 'in intervals';
                descList.push(['y', 'The y-axis show genomic intervals.']);
            } else {
                descList.push(['y', 'The y-axis shows the genome.']);
            }
            descGenomic = descGenomic.concat('The genome is shown ' + add + ' on the y-axis.');
        }
    }
    // if (attributeExists(track.data.details.data, 'binSize')) {
    //     let bin = attributeExistsReturn(track.data.details.data, 'binSize') * 256;
    //     if (typeof bin === 'number') {
    //         descGenomic = descGenomic.concat(' Data is binned in intervals of ' +  + ' basepairs.');
    //     }
    // }

    // expression encodings
    const quantitativeEncodingsI = track.appearance.details.encodings.encodingDeepQuantitative.map(o => o.name);

    if (quantitativeEncodingsI.length > 1) {
        descQuantitative = descQuantitative.concat('The expression values are shown with ' + markToText.get(mark) + ' on the ' + arrayToString(quantitativeEncodingsI) + '-axes.');
        for (const q of quantitativeEncodingsI) {
            descList.push([q, 'The ' + q + ' of the ' + markToText.get(mark) + ' shows the expression values.']);
        }
    } else if (quantitativeEncodingsI.length === 1) {
        if (quantitativeEncodingsI.includes('y')) {
            descQuantitative = descQuantitative.concat('The expression is shown on the y-axis with ' + markToText.get(mark) + '.');
            descList.push(['y', 'The y-axis shows the expression with' + markToText.get(mark) + '.']);
        }
        else if (quantitativeEncodingsI.includes('color')) {
            descQuantitative = descQuantitative.concat('The height of the expression values is shown with color.');
            descList.push(['color', 'The color of the ' + markToText.get(mark) + ' shows the expression values.']);
        }
        else {
            descQuantitative = descQuantitative.concat('The height of the expression values is shown with the ' + quantitativeEncodingsI[0] + '-axis.');
            descList.push([channelToText.get(quantitativeEncodingsI[0]) as string, 'The ' + channelToText.get(quantitativeEncodingsI[0]) + ' of the ' + markToText.get(mark) + ' shows the expression values.']);
        }
    }

    // nominal encodings
    const nominalEncodingsI = track.appearance.details.encodings.encodingDeepNominal.map(o => o.name);

    if (nominalEncodingsI.length > 1) {
        if (nominalEncodingsI.includes('row')) {
            descNominal = descNominal.concat('The chart is stratified by rows for the categories.');
            const nominalEncodingsINames = nominalEncodingsI.filter(e => e !== 'row').map(e => channelToText.get(e)) as string[];
            descNominal = descNominal.concat(' The categories are also shown with the ' + arrayToString(nominalEncodingsINames) + ' of the ' + markToText.get(mark) + '.');
            descList.push(['row', 'The chart is stratified by rows for the categories.']);
            for (const q of nominalEncodingsINames) {
                descList.push([channelToText.get(q) as string, 'The ' + q + ' of the ' + markToText.get(mark) + ' show the different categories.']);
            }
        }
        else {
            const nominalEncodingsINames = nominalEncodingsI.map(e => channelToText.get(e)) as string[];
            descNominal = descNominal.concat('The categories are shown with the ' + arrayToString(nominalEncodingsINames) + ' of the ' + markToText.get(mark) + '.');
            for (const q of nominalEncodingsI) {
                descList.push([channelToText.get(q) as string, 'The ' + q + ' of the ' + markToText.get(mark) + ' show the different categories.']);
            }
        }
    }
    else if (nominalEncodingsI.length == 1) {
        if (nominalEncodingsI.includes('row')) {
            descNominal = descNominal.concat('The chart is stratified by rows for the categories.');
            descList.push(['row', 'The chart is stratified by rows for the categories.']);
        }
        else {
            descNominal = descNominal.concat('The ' + channelToText.get(nominalEncodingsI[0]) + ' of the ' + markToText.get(mark) + ' indicates the different categories.');
            descList.push([channelToText.get(nominalEncodingsI[0]) as string, 'The ' + channelToText.get(nominalEncodingsI[0]) + ' of the ' + markToText.get(mark) + ' show the different categories.']);
        }
    }

    // value encodings
    for (let i = 0; i < track.appearance.details.encodings.encodingValue.length; i++) {
        const e = track.appearance.details.encodings.encodingValue[i];
        if (e.name === 'color') {
            descValue = descValue.concat('The color of the ' + markToText.get(mark) + ' is ' + e.details.value + '.');
            descList.push(['color', 'The color of the ' + markToText.get(mark) + ' is ' + e.details.value + '.']);
        }
    }

    const desc = ''.concat(descGenomic + ' ' + descQuantitative + ' ' + descNominal + ' ' + descValue);

    return {desc: desc, descList: descList};
}
