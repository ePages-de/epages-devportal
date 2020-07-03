class Kramdown::Converter::Html
  # You can override any function from this page:
  # https://kramdown.gettalong.org/rdoc/Kramdown/Converter/Html.html
  def convert_blockquote(el, indent)
    Jekyll::Quote.render_with_quotes(inner(el, indent))
  end
end
