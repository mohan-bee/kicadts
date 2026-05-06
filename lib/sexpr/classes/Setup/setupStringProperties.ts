import { SxClass } from "../../base-classes/SxClass"
import type { PrimitiveSExpr } from "../../parseToPrimitiveSExpr"
import { toStringValue } from "../../utils/toStringValue"

import { SingleValueProperty } from "./base"

abstract class SetupStringProperty extends SingleValueProperty<string> {
  static override parentToken = "setup"
}

export class SetupZone45Only extends SetupStringProperty {
  static override token = "zone_45_only"
  token = "zone_45_only"
}
SxClass.register(SetupZone45Only)

export class SetupAllowSoldermaskBridgesInFootprints extends SetupStringProperty {
  static override token = "allow_soldermask_bridges_in_footprints"
  token = "allow_soldermask_bridges_in_footprints"
}
SxClass.register(SetupAllowSoldermaskBridgesInFootprints)

export class SetupVisibleElements extends SetupStringProperty {
  static override token = "visible_elements"
  token = "visible_elements"
}
SxClass.register(SetupVisibleElements)

export class SetupUviasAllowed extends SetupStringProperty {
  static override token = "uvias_allowed"
  token = "uvias_allowed"
}
SxClass.register(SetupUviasAllowed)

export class SetupTenting extends SxClass {
  static override token = "tenting"
  static override parentToken = "setup"
  token = "tenting"

  protected _sides: string[] = []

  constructor(sides: string[] = []) {
    super()
    this.sides = sides
  }

  static override fromSexprPrimitives(
    primitiveSexprs: PrimitiveSExpr[],
  ): SetupTenting {
    return new SetupTenting(getSetupSides(primitiveSexprs))
  }

  get sides(): string[] {
    return [...this._sides]
  }

  set sides(sides: string[]) {
    this._sides = sides.map((side) => String(side))
  }

  override getChildren(): SxClass[] {
    return []
  }

  override getString(): string {
    if (this._sides.length === 0) {
      return `(${this.token})`
    }
    return `(${this.token} ${this._sides.join(" ")})`
  }
}
SxClass.register(SetupTenting)

export class SetupCovering extends SetupTenting {
  static override token = "covering"
  override token = "covering"

  static override fromSexprPrimitives(
    primitiveSexprs: PrimitiveSExpr[],
  ): SetupCovering {
    return new SetupCovering(getSetupSides(primitiveSexprs))
  }
}
SxClass.register(SetupCovering)

export class SetupPlugging extends SetupTenting {
  static override token = "plugging"
  override token = "plugging"

  static override fromSexprPrimitives(
    primitiveSexprs: PrimitiveSExpr[],
  ): SetupPlugging {
    return new SetupPlugging(getSetupSides(primitiveSexprs))
  }
}
SxClass.register(SetupPlugging)

export class SetupCapping extends SetupStringProperty {
  static override token = "capping"
  token = "capping"
}
SxClass.register(SetupCapping)

export class SetupFilling extends SetupStringProperty {
  static override token = "filling"
  token = "filling"
}
SxClass.register(SetupFilling)

function getSetupSides(primitiveSexprs: PrimitiveSExpr[]): string[] {
  const sides: string[] = []
  for (const primitive of primitiveSexprs) {
    const side = toStringValue(primitive)
    if (side !== undefined) {
      sides.push(side)
      continue
    }
    if (!Array.isArray(primitive)) continue
    const [sidePrimitive, enabledPrimitive] = primitive
    if (toStringValue(enabledPrimitive) !== "yes") continue
    const nestedSide = toStringValue(sidePrimitive)
    if (nestedSide !== undefined) {
      sides.push(nestedSide)
    }
  }
  return sides
}
