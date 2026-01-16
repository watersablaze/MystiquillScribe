import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
  html: false,
  linkify: true,
  breaks: true,
});

export function renderMarkdownToHtml(markdown: string): string {
  if (!markdown || !markdown.trim()) {
    return '<p><em>(This scroll is empty.)</em></p>';
  }

  return md.render(markdown);
}
