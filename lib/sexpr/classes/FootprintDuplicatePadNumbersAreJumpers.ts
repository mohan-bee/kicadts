import { SxClass } from "../base-classes/SxClass"
import type { PrimitiveSExpr } from "../parseToPrimitiveSExpr"
import { toStringValue } from "../utils/toStringValue"

export class FootprintDuplicatePadNumbersAreJumpers extends SxClass {
  static override token = "duplicate_pad_numbers_are_jumpers"
  static override parentToken = "footprint"
  token = "duplicate_pad_numbers_are_jumpers"

  private _state: string

  constructor(state: string) {
    super()
    this._state = state
  }

  static override fromSexprPrimitives(
    primitiveSexprs: PrimitiveSExpr[],
  ): FootprintDuplicatePadNumbersAreJumpers {
    const state = toStringValue(primitiveSexprs[0])
    if (state === undefined) {
      throw new Error("duplicate_pad_numbers_are_jumpers expects yes or no")
    }
    return new FootprintDuplicatePadNumbersAreJumpers(state)
  }

  get state(): string {
    return this._state
  }

  set state(state: string) {
    this._state = state
  }

  override getChildren(): SxClass[] {
    return []
  }

  override getString(): string {
    return `(duplicate_pad_numbers_are_jumpers ${this._state})`
  }
}
SxClass.register(FootprintDuplicatePadNumbersAreJumpers)
