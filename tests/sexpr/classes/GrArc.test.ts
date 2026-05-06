import { expect, test } from "bun:test"

import { GrArc, SxClass } from "lib/sexpr"

test("GrArc parses locked", () => {
  const [grArc] = SxClass.parse(`
    (gr_arc
      (start 0 0)
      (mid 1 1)
      (end 2 0)
      (stroke
        (width 0.1)
        (type solid)
      )
      (locked yes)
      (layer "F.SilkS")
    )
  `) as GrArc[]

  expect(grArc.locked).toBe(true)
})
