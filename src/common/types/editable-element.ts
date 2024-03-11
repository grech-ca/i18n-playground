import * as ICU from '@formatjs/icu-messageformat-parser'
import {U} from 'ts-toolbelt'

export type EditableElement = U.Exclude<ICU.MessageFormatElement, ICU.LiteralElement | ICU.TagElement | ICU.PoundElement>
