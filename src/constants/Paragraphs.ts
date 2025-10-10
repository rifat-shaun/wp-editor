export const LIST_TYPE_OPTIONS = [
    [
      {
        key: "decimal",
        main: ["1.", "2."],
        nested: ["a.", "b."],
        deepNested: ["i.", "ii."],
      },
      {
        key: "decimal-parenthesis",
        main: ["1)", "2)"],
        nested: ["a)", "b)"],
        deepNested: ["i)", "ii)"],
      },
      {
        key: "decimal-nested",
        main: ["1.", "2."],
        nested: ["1.1", "1.2"],
        deepNested: ["1.2.1", "1.2.2"],
      },
    ],
    [
      {
        key: "upper-alpha-mixed",
        main: ["A.", "B."],
        nested: ["a.", "b."],
        deepNested: ["i.", "ii."],
      },
      {
        key: "upper-roman-mixed",
        main: ["I.", "II."],
        nested: ["A.", "B."],
        deepNested: ["1.", "2."],
      },
      {
        key: "decimal-leading-zero-mixed",
        main: ["01.", "02."],
        nested: ["a.", "b."],
        deepNested: ["i.", "ii."],
      },
    ],
  ];
  
  export const BULLET_TYPE_OPTIONS = [
    [
      {
        key: "default",
        main: ["⬤", "⬤"],
        nested: ["○", "○"],
        deepNested: ["■", "■"],
      },
      {
        key: "diamondArrow",
        main: ["❖", "❖"],
        nested: ["➤", "➤"],
        deepNested: ["■", "■"],
      },
      {
        key: "square",
        main: ["☐", "☐"],
        nested: ["☐", "☐"],
        deepNested: ["☐", "☐"],
      },
    ],
    [
      {
        key: "arrowDiamond",
        main: ["➔", "➔"],
        nested: ["◆", "◆"],
        deepNested: ["⬤", "⬤"],
      },
      {
        key: "star",
        main: ["★", "★"],
        nested: ["○", "○"],
        deepNested: ["■", "■"],
      },
      {
        key: "arrowCircle",
        main: ["➤", "➤"],
        nested: ["○", "○"],
        deepNested: ["■", "■"],
      },
    ],
  ]; 
  