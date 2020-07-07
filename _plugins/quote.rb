module Jekyll
  class Quote < Liquid::Block

    def render(context)
      Jekyll::Quote.render_with_quotes(Kramdown::Document.new(super).to_html)
    end

    def self.render_with_quotes(html_element)
      %{<div class="quote">
          <div class="quote__text">
            #{html_element}
            <i class="quote__icon quote__icon--left fas fa-quote-left"></i>
            <i class="quote__icon quote__icon--right fas fa-quote-right"></i>
          </div>
        </div>}
    end
  end
end

Liquid::Template.register_tag('quote', Jekyll::Quote)
