import {
	LinearFilter,
	Texture,
} from 'three';

import Document_createCanvas from '/utils/Document/createCanvas';
import Lang_isUndefined from '/utils/Lang/isUndefined';

import getFont from './getFont';
import getTextLines from './getTextLines';
import getTextBoxWidth from './getTextBoxWidth';

export default class extends Texture {
	constructor({
		autoRedraw = true,
		text = '',
		textAlign = 'center',
		textLineHeight = 1.15,
		fontFamily = 'sans-serif',
		fontSize = 16,
		fontWeight = 'normal',
		fontVariant = 'normal',
		fontStyle = 'normal',
		fillStyle = 'white',
		lineWidth = 0,
		strokeStyle = 'black',
		padding = 0.25,
		magFilter = LinearFilter,
		minFilter = LinearFilter,
		mapping, wrapS, wrapT, format, type, anisotropy,
	} = {}) {
		super(Document_createCanvas(), mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy);
		this.autoRedraw = autoRedraw;
		this._text = text;
		this._textAlign = textAlign;
		this._textLineHeight = textLineHeight;
		this._fontFamily = fontFamily;
		this._fontSize = fontSize;
		this._fontWeight = fontWeight;
		this._fontVariant = fontVariant;
		this._fontStyle = fontStyle;
		this._fillStyle = fillStyle;
		this._lineWidth = lineWidth;
		this._strokeStyle = strokeStyle;
		this._padding = padding;
		this.redraw();
	}

	redraw() {
		let ctx = this.image.getContext('2d');
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		if (this.textBoxWidthInPixels && this.textBoxHeightInPixels) {
			ctx.canvas.width = this.paddingBoxWidthInPixels;
			ctx.canvas.height = this.paddingBoxHeightInPixels;
			ctx.font = this.font;
			ctx.textBaseline = 'middle';
			let left;
			switch (this.textAlign) {
				case 'left':
					ctx.textAlign = 'left';
					left = this.paddingInPixels;
					break;
				case 'right':
					ctx.textAlign = 'right';
					left = this.paddingInPixels + this.textBoxWidthInPixels;
					break;
				case 'center':
					ctx.textAlign = 'center';
					left = this.paddingInPixels + this.textBoxWidthInPixels / 2;
					break;
			}
			let top = this.paddingInPixels + this.fontSize / 2;
			ctx.fillStyle = this.fillStyle;
			ctx.miterLimit = 1;
			ctx.lineWidth = this.lineWidthInPixels;
			ctx.strokeStyle = this.strokeStyle;
			this.textLines.forEach(text => {
				if (this.lineWidth) {
					ctx.strokeText(text, left, top);
				}
				ctx.fillText(text, left, top);
				top += this.textLineHeightInPixels;
			});
		} else {
			ctx.canvas.width = ctx.canvas.height = 1;
		}
		this.needsUpdate = true;
	}

	_redrawIfAuto() {
		if (this.autoRedraw) {
			this.redraw();
		}
	}

	get text() {
		return this._text;
	}

	set text(value) {
		if (this._text !== value) {
			this._text = value;
			this._textLines = undefined;
			this._textBoxWidthInPixels = undefined;
			this._redrawIfAuto();
		}
	}

	get textAlign() {
		return this._textAlign;
	}

	set textAlign(value) {
		if (this._textAlign !== value) {
			this._textAlign = value;
			this._redrawIfAuto();
		}
	}

	get textLines() {
		if (Lang_isUndefined(this._textLines)) {
			this._textLines = getTextLines(this.text);
		}
		return this._textLines;
	}

	get textLineHeight() {
		return this._textLineHeight;
	}

	set textLineHeight(value) {
		if (this._textLineHeight !== value) {
			this._textLineHeight = value;
			this._redrawIfAuto();
		}
	}

	get textLineHeightInPixels() {
		return this.fontSize * this.textLineHeight;
	}

	get fontFamily() {
		return this._fontFamily;
	}

	set fontFamily(value) {
		if (this._fontFamily !== value) {
			this._fontFamily = value;
			this._textBoxWidthInPixels = undefined;
			this._redrawIfAuto();
		}
	}

	get fontSize() {
		return this._fontSize;
	}

	set fontSize(value) {
		if (this._fontSize !== value) {
			this._fontSize = value;
			this._textBoxWidthInPixels = undefined;
			this._redrawIfAuto();
		}
	}

	get fontWeight() {
		return this._fontWeight;
	}

	set fontWeight(value) {
		if (this._fontWeight !== value) {
			this._fontWeight = value;
			this._textBoxWidthInPixels = undefined;
			this._redrawIfAuto();
		}
	}

	get fontVariant() {
		return this._fontVariant;
	}

	set fontVariant(value) {
		if (this._fontVariant !== value) {
			this._fontVariant = value;
			this._textBoxWidthInPixels = undefined;
			this._redrawIfAuto();
		}
	}

	get fontStyle() {
		return this._fontStyle;
	}

	set fontStyle(value) {
		if (this._fontStyle !== value) {
			this._fontStyle = value;
			this._textBoxWidthInPixels = undefined;
			this._redrawIfAuto();
		}
	}

	get font() {
		return getFont(
			this.fontStyle,
			this.fontVariant,
			this.fontWeight,
			this.fontSize,
			this.fontFamily,
		);
	}

	get fillStyle() {
		return this._fillStyle;
	}

	set fillStyle(value) {
		if(this._fillStyle !== value) {
			this._fillStyle = value;
			this._redrawIfAuto();
		}
	}

	get lineWidth() {
		return this._lineWidth;
	}

	set lineWidth(value) {
		if(this._lineWidth !== value) {
			this._lineWidth = value;
			this._redrawIfAuto();
		}
	}

	get lineWidthInPixels() {
		return this._lineWidth * this.fontSize;
	}

	get strokeStyle() {
		return this._strokeStyle;
	}

	set strokeStyle(value) {
		if(this._strokeStyle !== value) {
			this._strokeStyle = value;
			this._redrawIfAuto();
		}
	}

	get textBoxWidthInPixels() {
		if (Lang_isUndefined(this._textBoxWidthInPixels)) {
			this._textBoxWidthInPixels = getTextBoxWidth(
				this.textLines,
				this.font,
			);
		}
		return this._textBoxWidthInPixels;
	}

	get textBoxHeight() {
		return this.textLineHeight * (this.textLines.length - 1) + 1;
	}

	get textBoxHeightInPixels() {
		return this.textBoxHeight * this.fontSize;
	}

	get padding() {
		return this._padding;
	}

	set padding(value) {
		if (this._padding !== value) {
			this._padding = value;
			this._redrawIfAuto();
		}
	}

	get paddingInPixels() {
		return this.padding * this.fontSize;
	}

	get paddingBoxWidthInPixels() {
		return this.textBoxWidthInPixels + 2 * this.paddingInPixels;
	}

	get paddingBoxHeight() {
		return this.textBoxHeight + 2 * this.padding;
	}

	get paddingBoxHeightInPixels() {
		return this.paddingBoxHeight * this.fontSize;
	}

	get aspect() {
		if (this.image.width && this.image.height) {
			return this.image.width / this.image.height;
		}
		return 1;
	}
}
