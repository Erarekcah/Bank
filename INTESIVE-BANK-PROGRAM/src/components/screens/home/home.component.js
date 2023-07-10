import { BaseScreen } from '@/core/component/base-screen.component'
import { $R } from '@/core/rquery/rquery.lib'
import renderService from '@/core/services/render.service'

import { Field } from '@/components/ui/field/field.component'
import { UserItem } from '@/components/ui/user-item/user-item.component'

import styles from './home.module.scss'
import template from './home.template.html'

export class Home extends BaseScreen {
	constructor() {
		super({ title: 'Home' })
	}

	render() {
		const element = renderService.htmlToElement(
			template,
			[
				new Field({
					name: 'asdasd',
					placeholder: 'Enter email',
					variant: 'green'
				}),
				new UserItem(
					{
						avatarPath:
							'https://prisma-blog-ebon.vercel.app/blog/posts/type-safe_js_with_JsDoc.png',
						name: 'Salman'
					},
					true,
					() => alert('')
				)
			],
			styles
		)

		$R(element).find('h1').css('color', 'pink')

		return element
	}
}
