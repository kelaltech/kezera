export function richTextToDisplayText(data: any) {
  let article = ''
  let description = ''
  let title = ''

  //for mapping the stored Editor state in to plain text/string
  for (let d of data) {
    JSON.parse(d.article).blocks.map((block: any) => (article += block.text))
    JSON.parse(d.title).blocks.map((block: any) => (title += block.text))
    JSON.parse(d.description).blocks.map((block: any) => (description += block.text))
    d.article = article
    d.title = title
    d.description = description

    article = ''
    description = ''
    title = ''
  }
  return data
}

export function richTextToDisplayDetail(data: any) {
  let article = ''
  let description = ''
  let title = ''

  JSON.parse(data.article).blocks.map((block: any) => (article += block.text))
  JSON.parse(data.title).blocks.map((block: any) => (title += block.text))
  JSON.parse(data.description).blocks.map((block: any) => (description += block.text))
  data.article = article
  data.title = title
  data.description = description

  return data
}
