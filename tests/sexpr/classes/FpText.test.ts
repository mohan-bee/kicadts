import { expect, test } from "bun:test"
import { SxClass } from "../../../lib/sexpr/base-classes/SxClass"
import "../../../lib/sexpr/registerAll"
import { FpText } from "../../../lib/sexpr/classes/FpText"

test("FpText parses bare locked token", () => {
  const [fpText] = SxClass.parse(`
    (fp_text user "\${REFERENCE}"
      locked
      (at 0 0 90)
      (layer "F.Fab")
      (effects
        (font
          (size 0.5 0.5)
          (thickness 0.08)
        )
      )
    )
  `) as FpText[]

  expect(fpText.locked).toBe(true)
  expect(fpText.getString()).toContain("locked")
})
