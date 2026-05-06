import { expect, test } from "bun:test"

import { Footprint, SxClass } from "lib/sexpr"

test("FootprintModel parses opacity", () => {
  const [footprint] = SxClass.parse(`
    (footprint "Test:Model"
      (layer "F.Cu")
      (model "\${KICAD10_3DMODEL_DIR}/Package.step"
        (opacity 0.5)
      )
    )
  `) as Footprint[]

  const model = footprint.models[0]!
  expect(model.opacity).toBe(0.5)
  expect(model.getString()).toContain("(opacity 0.5)")
})
