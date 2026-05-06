import { expect, test } from "bun:test"

import { SxClass, Via } from "lib/sexpr"

test("Via parses capping", () => {
  const [via] = SxClass.parse(`
    (via
      (at 1 2)
      (size 0.6)
      (drill 0.3)
      (layers "F.Cu" "B.Cu")
      (capping no)
      (covering
        (front yes)
        (back no)
      )
      (plugging
        (front no)
        (back yes)
      )
      (filling no)
    )
  `) as Via[]

  expect(via.capping).toBe("no")
  expect(via.covering).toEqual(["front"])
  expect(via.plugging).toEqual(["back"])
  expect(via.filling).toBe("no")
})
