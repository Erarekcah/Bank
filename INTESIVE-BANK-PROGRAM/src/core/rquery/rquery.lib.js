//$R('#rrt).find('.rge').css('', '').text('').html('')
import { formatCardNumberWithDashes } from '@/utils/format/format-card-number'

/**
 * Represents the RQuery class for working DOM element
 */
class RQuery {
	/**
	 *Create a new RQuery instance
	 * @param {string | HTMLElement} selector - A CSS selector string or an HTMLElement.
	 */
	constructor(selector) {
		if (typeof selector === 'string') {
			this.element = document.querySelector(selector)

			if (!this.element) {
				throw new Error(`Element ${selector} not found`)
			}
		} else if (selector instanceof HTMLElement) {
			this.element = selector
		} else {
			throw new Error(`Invalid selector type`)
		}
	}

	/* FIND */
	/**
	 *
	 * @param {string} selector - A CSS selector string to search for within the selected element.
	 * @returns {RQuery} A new RQuery instance for the found element.
	 */
	find(selector) {
		const element = new RQuery(this.element.querySelector(selector))

		if (element) {
			return element
		} else {
			throw new Error(`Element ${selector} not found`)
		}
	}

	/* INSERT */

	/**
	 *
	 * @param {HTMLElement} childElement
	 * @returns {RQuery}
	 */
	append(childElement) {
		this.element.appendChild(childElement)
		return this
	}
	/**
	 *
	 * @param {HTMLElement} newElement
	 * @returns {RQuery}
	 */
	before(newElement) {
		if (!(newElement instanceof HTMLElement)) {
			throw new Error(`Element must be an HTMLElement`)
		}

		console.log(this.element.parentElement)
		const parentElement = this.element.parentElement

		if (parentElement) {
			parentElement.insertBefore(newElement, this.element)
			return this
		} else {
			throw new Error('Element does not have a parent element')
		}
	}
	/**
	 *
	 * @param {string} [htmlContent]
	 * @returns {RQuery|string}
	 */
	html(htmlContent) {
		if (typeof htmlContent === 'undefined') {
			return this.element.innerHTML
		} else {
			this.element.innerHTML = htmlContent
			return this
		}
	}

	/* EVENTS */

	/**
	 *
	 * @param {function(Event): void} callback
	 * @returns {RQuery}
	 */
	click(callback) {
		this.element.addEventListener('click', callback)
		return this
	}

	/* FORM */
	/**
	 *
	 * @param {object} options
	 * @param {function(Event): void} [options.onInput]
	 * @param {object} [options.rest]
	 * @returns {RQuery}
	 */
	input({ onInput, ...rest }) {
		if (this.element.tagName.toLowerCase() !== 'input')
			throw new Error('Element must be an input')

		for (const [key, value] of Object.entries(rest)) {
			this.element.setAttribute(key, value)
		}

		if (onInput) {
			this.element.addEventListener('input', onInput)
		}
		return this
	}
	/**
	 *
	 * @param {number} [limit]
	 * @returns {RQuery}
	 */
	numberInput(limit) {
		if (
			this.element.tagName.toLowerCase() !== 'input' ||
			this.element.type !== 'number'
		)
			throw new Error('Element must be  an input  with type "number"')
		this.element.addEventListener('input', event => {
			let value = event.target.value.replace(/[^0-9]/g, '')
			if (limit) value = value.substring(0, limit)
			event.target.value = value
		})
		return this
	}

	/**
	 * @returns {RQuery}
	 */
	creditCardInput() {
		const limit = 16
		if (
			this.element.tagName.toLowerCase() !== 'input' ||
			this.element.type !== 'text'
		)
			throw new Error('Element must be  an input  with type "text"')
		this.element.addEventListener('input', event => {
			let value = event.target.value.replace(/[^0-9]/g, '')
			if (limit) value = value.substring(0, limit)
			event.target.value = formatCardNumberWithDashes(value)
		})
		return this
	}

	/* STYLES */

	/**
	 *
	 * @param {string} property
	 * @param {string} value
	 * @returns {RQuery}
	 */
	css(property, value) {
		if (typeof property !== 'string' || typeof value !== 'string') {
			throw new Error(`property and value must be strings`)
		}

		this.element.style[property] = value
		return this
	}
	/**
	 * Add Class
	 * @param {string | string[]} classNames
	 *
	 * @returns {RQuery}
	 */
	addClass(classNames) {
		if (Array.isArray(classNames)) {
			for (const className of classNames) {
				this.element.classList.add(className)
			}
		} else {
			this.element.classList.add(classNames)
		}
		return this
	}
	/**
	 * Remove Class
	 * @param {string | string[]} classNames
	 *
	 * @returns {RQuery}
	 */
	removeClass(classNames) {
		if (Array.isArray(classNames)) {
			for (const className of classNames) {
				this.element.classList.remove(className)
			}
		} else {
			this.element.classList.remove(classNames)
		}
		return this
	}
}
/**
 * Create a new RQuery instance for the given selector
 * @param {string | HTMLElement} selector  A CSS selector string or an HTMLElement.
 * @returns {RQuery} A new RQuery instance for the given selector
 */
export function $R(selector) {
	return new RQuery(selector)
}
