export const ruleMark = {
  "title": "Tonsil ChIP-seq in Th1 cells",
  "subtitle": "Annotated bar chart with lines",
  "style": {"dashed": [3, 3]},
  "views": [
    {
      "alignment": "overlay",
      "tracks": [
        {
          "data": {
            "url": "https://server.gosling-lang.org/api/v1/tileset_info/?d=cistrome-multivec",
            "type": "multivec",
            "row": "sample",
            "column": "position",
            "value": "peak",
            "categories": ["Th1"],
            "binSize": 4
          },
          "mark": "bar",
          "x": {"field": "start", "type": "genomic"},
          "xe": {"field": "end", "type": "genomic"},
          "y": {"field": "peak", "type": "quantitative", "domain": [0, 0.003]},
          "color": {"value": "lightgray"}
        },
        {
          "data": {
            "type": "json",
            "values": [
              {"c": "chr5", "p": 100000, "v": 0.0004},
              {"c": "chr10", "p": 100000, "v": 0.0009}
            ],
            "chromosomeField": "c",
            "genomicFields": ["p"]
          },
          "mark": "rule",
          "x": {"field": "p", "type": "genomic"},
          "y": {"field": "v", "type": "quantitative", "domain": [0, 0.003]},
          "strokeWidth": {"field": "v", "type": "quantitative"},
          "color": {"value": "blue"}
        }
      ],
      "width": 500,
      "height": 200
    }
  ]
}

export const ruleMark4 = {
    "title": "Rule Mark",
    "subtitle": "Annotate visualization with horizontal and vertical lines",
    "style": {"dashed": [3, 3]},
    "views": [
      {
        "alignment": "overlay",
        "tracks": [
          {
            "data": {
              "url": "https://server.gosling-lang.org/api/v1/tileset_info/?d=cistrome-multivec",
              "type": "multivec",
              "row": "sample",
              "column": "position",
              "value": "peak",
              "categories": ["sample 1"],
              "binSize": 4
            },
            "mark": "bar",
            "x": {"field": "start", "type": "genomic"},
            "xe": {"field": "end", "type": "genomic"},
            "y": {"field": "peak", "type": "quantitative", "domain": [0, 0.003]},
            "color": {"value": "lightgray"}
          },
          {
            "data": {
              "type": "json",
              "values": [
                {"c": "chr2", "p": 100000, "v": 0.0001},
                {"c": "chr5", "p": 100000, "v": 0.0004},
                {"c": "chr10", "p": 100000, "v": 0.0009}
              ],
              "chromosomeField": "c",
              "genomicFields": ["p"]
            },
            "mark": "rule",
            "x": {"field": "p", "type": "genomic"},
            "y": {"field": "v", "type": "quantitative", "domain": [0, 0.003]},
            "strokeWidth": {"field": "v", "type": "quantitative"},
            "color": {"value": "red"}
          },
          {
            "data": {
              "type": "json",
              "values": [
                {"c": "chr2", "p": 100000, "v": 0.0001},
                {"c": "chr5", "p": 100000, "v": 0.0004},
                {"c": "chr10", "p": 100000, "v": 0.0009}
              ],
              "chromosomeField": "c",
              "genomicFields": ["p"]
            },
            "mark": "rule",
            "x": {"field": "p", "type": "genomic"},
            "strokeWidth": {"value": 2},
            "color": {"value": "blue"}
          }
        ],
        "width": 500,
        "height": 200
      }
    ]
  }


  export const ruleMark2 = {
    "title": "Rule Mark",
    "subtitle": "Annotate visualization with horizontal and vertical lines",
    "style": {"dashed": [3, 3]},
    "views": [
      {
        "alignment": "overlay",
        "mark": "rule",
        "tracks": [
          {
            "data": {
              "url": "https://server.gosling-lang.org/api/v1/tileset_info/?d=cistrome-multivec",
              "type": "multivec",
              "row": "sample",
              "column": "position",
              "value": "peak",
              "categories": ["sample 1"],
              "binSize": 4
            },
            "mark": "bar",
            "x": {"field": "start", "type": "genomic"},
            "xe": {"field": "end", "type": "genomic"},
            "y": {"field": "peak", "type": "quantitative", "domain": [0, 0.003]},
            "color": {"value": "lightgray"}
          },
          {
            "data": {
              "type": "json",
              "values": [
                {"c": "chr2", "p": 100000, "v": 0.0001},
                {"c": "chr5", "p": 100000, "v": 0.0004},
                {"c": "chr10", "p": 100000, "v": 0.0009}
              ],
              "chromosomeField": "c",
              "genomicFields": ["p"]
            },
            // "mark": "rule",
            "x": {"field": "p", "type": "genomic"},
            "y": {"field": "v", "type": "quantitative", "domain": [0, 0.003]},
            "strokeWidth": {"field": "v", "type": "quantitative"},
            "color": {"value": "red"}
          },
          {
            "data": {
              "type": "json",
              "values": [
                {"c": "chr2", "p": 100000, "v": 0.0001},
                {"c": "chr5", "p": 100000, "v": 0.0004},
                {"c": "chr10", "p": 100000, "v": 0.0009}
              ],
              "chromosomeField": "c",
              "genomicFields": ["p"]
            },
            // "mark": "rule",
            "x": {"field": "p", "type": "genomic"},
            "strokeWidth": {"value": 2},
            "color": {"value": "blue"}
          }
        ],
        "width": 500,
        "height": 200
      }
    ]
  }



  export const ruleMarkOverlaidWithSecondEncoding = {
    "title": "Rule Mark",
    "subtitle": "Annotate visualization with horizontal and vertical lines",
    "style": {"dashed": [3, 3]},
    "views": [
      {
        "alignment": "overlay",
        "tracks": [
          {
            "data": {
              "url": "https://server.gosling-lang.org/api/v1/tileset_info/?d=cistrome-multivec",
              "type": "multivec",
              "row": "sample",
              "column": "position",
              "value": "peak",
              "categories": ["sample 1"],
              "binSize": 4
            },
            "mark": "bar",
            "x": {"field": "start", "type": "genomic"},
            "xe": {"field": "end", "type": "genomic"},
            "y": {"field": "peak", "type": "quantitative", "domain": [0, 0.003]},
            "color": {"value": "lightgray"}
          },
          {
            "data": {
              "url": "https://server.gosling-lang.org/api/v1/tileset_info/?d=cistrome-multivec",
              "type": "multivec",
              "row": "sample",
              "column": "position",
              "value": "peak",
              "categories": ["sample 1"],
              "binSize": 4
            },
            "mark": "point",
            "x": {"field": "start", "type": "genomic"},
            "y": {"field": "peak", "type": "quantitative", "domain": [0, 0.003]},
            "color": {"value": "red"}
          }
        ],
        "width": 500,
        "height": 200
      }
    ]
  }




export const ruleMarkOverlaidWithSecondEncodingSame = {
  "title": "Rule Mark",
  "subtitle": "Annotate visualization with horizontal and vertical lines",
  "style": {"dashed": [3, 3]},
  "views": [
    {
      "alignment": "overlay",
      "data": {
            "url": "https://server.gosling-lang.org/api/v1/tileset_info/?d=cistrome-multivec",
            "type": "multivec",
            "row": "sample",
            "column": "position",
            "value": "peak",
            "categories": ["sample 1"],
            "binSize": 4
          },
        "x": {"field": "start", "type": "genomic"},
        "y": {"field": "peak", "type": "quantitative", "domain": [0, 0.003]},
        "color": "red",
      "tracks": [
        {
          "mark": "bar",
          "xe": {"field": "end", "type": "genomic"},
          "color": {"value": "lightgray"}
        },
        {
          "mark": "point",
          "color": {"value": "red"}
        }
      ],
      "width": 500,
      "height": 200
    }
  ]
}