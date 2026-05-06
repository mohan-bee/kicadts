import { expect, test } from "bun:test"

import { KicadPcb, SxClass } from "lib/sexpr"

test("KiCad 10 PCB name-only nets", () => {
  const [parsedPcb] = SxClass.parse(`
    (kicad_pcb
      (version 20260206)
      (generator "pcbnew")
      (layers
        (0 "F.Cu" signal)
      )
      (footprint "Test:Footprint"
        (layer "F.Cu")
        (duplicate_pad_numbers_are_jumpers no)
        (pad "1" smd rect
          (at 0 0)
          (size 1 1)
          (layers "F.Cu")
          (net "/GND")
        )
      )
      (segment
        (start 0 0)
        (end 1 0)
        (width 0.2)
        (layer "F.Cu")
        (net "/GND")
      )
      (via
        (at 1 1)
        (size 0.6)
        (drill 0.3)
        (layers "F.Cu" "B.Cu")
        (net "/GND")
      )
      (arc
        (start 0 0)
        (mid 1 1)
        (end 2 0)
        (width 0.2)
        (layer "F.Cu")
        (net "/GND")
        (locked yes)
      )
    )
  `)

  expect(parsedPcb).toBeInstanceOf(KicadPcb)
  const pcb = parsedPcb as KicadPcb
  expect(pcb.nets[0]?.id).toBe(1)
  expect(pcb.nets[0]?.name).toBe("/GND")
  expect(pcb.footprints[0]?.fpPads[0]?.net?.id).toBe(1)
  expect(pcb.footprints[0]?.fpPads[0]?.net?.name).toBe("/GND")
  expect(pcb.segments[0]?.net?.id).toBe(1)
  expect(pcb.segments[0]?.net?.name).toBe("/GND")
  expect(pcb.vias[0]?.net?.id).toBe(1)
  expect(pcb.vias[0]?.net?.name).toBe("/GND")
  expect(pcb.arcs[0]?.net).toBe(1)
  expect(pcb.arcs[0]?.netName).toBe("/GND")
  expect(pcb.arcs[0]?.locked).toBe(true)
})
