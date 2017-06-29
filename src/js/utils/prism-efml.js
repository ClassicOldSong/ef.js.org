export default {
	'efml_line': {
		pattern: /^.*?(\n|$)/,
		inside: {
			comment: /^(\s+)?(?=[^\s>.#%@+-]).*?(\n|$)/,
			'tag_define': {
				pattern: /^\s*(?=>).*?(\n|$)/,
				inside: {
					tag: />.*?(?=(\.|#|$|\n))/,
					class: {
						alias: 'attr-name',
						pattern: /\..*?(?=((#([^}]|\}[^}])*$)|$|\n))/,
						inside: {
							mustache: {
								pattern: /(\{\{).*?(?=(\}\}|$|\n))/,
								lookbehind: true,
								inside: {
									keyword: /^[^=].*?(?=(=|$))/,
									string: {
										pattern: /(=).*?(?=(\n|$))/,
										lookbehind: true,
									}
								}
							}
						}
					},
					property: /#([^}]|\}[^}])*$/
				}
			},
			'attr_define': {
				pattern: /\s*?(?=#).*?(\n|$)/,
				inside: {
					'attr-name': /#[^=].*?(?=(=|\n|$))/,
					string: {
						pattern: /(=).*?(?=(\n|$))/,
						lookbehind: true,
						inside: {
							mustache: {
								pattern: /(\{\{).*?(?=(\}\}|$|\n))/,
								lookbehind: true,
								inside: {
									keyword: /^[^=].*?(?=(=|$))/,
									string: {
										pattern: /(=).*?(?=(\n|$))/,
										lookbehind: true
									}
								}
							}
						}
					}
				}
			},
			'prop_define': {
				pattern: /\s*?(?=%).*?(\n|$)/,
				inside: {
					property: /%[^=].*?(?=(=|\n|$))/,
					string: {
						pattern: /(=).*?(?=(\n|$))/,
						lookbehind: true,
						inside: {
							mustache: {
								pattern: /(\{\{).*?(?=(\}\}|$|\n))/,
								lookbehind: true,
								inside: {
									keyword: /^[^=].*?(?=(=|$))/,
									string: {
										pattern: /(=).*?(?=(\n|$))/,
										lookbehind: true
									}
								}
							}
						}
					}
				}
			},
			'event_define': {
				pattern: /\s*?(?=@).*?(\n|$)/,
				inside: {
					keyword: /@[^=].*?(?=(=|\n|$))/,
					function: {
						pattern: /(=)[^:].*?(?=(:|\n|$))/,
						lookbehind: true
					},
					string: {
						pattern: /(:).*?(?=(\n|$))/,
						lookbehind: true,
						inside: {
							mustache: {
								pattern: /(\{\{).*?(?=(\}\}|$|\n))/,
								lookbehind: true,
								inside: {
									keyword: /^[^=].*?(?=(=|$))/,
									string: {
										pattern: /(=).*?(?=(\n|$))/,
										lookbehind: true
									}
								}
							}
						}
					}
				}
			},
			text: {
				pattern: /\s*?(?=\.).*?(\n|$)/,
				inside: {
					mustache: {
						pattern: /(\{\{).*?(?=(\}\}|$|\n))/,
						lookbehind: true,
						inside: {
							keyword: /^[^=].*?(?=(=|$))/,
							string: {
								pattern: /(=).*?(?=(\n|$))/,
								lookbehind: true
							}
						}
					}
				}
			}
		}
	}
}
