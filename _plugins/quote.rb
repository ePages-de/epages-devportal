module Jekyll
  class Quote < Liquid::Block

    def render(context)
      %{<div class="quote">
          <div class="quote__text">
            #{Kramdown::Document.new(super).to_html}
            <i class="quote__icon quote__icon--left fas fa-quote-left"></i>
            <i class="quote__icon quote__icon--right fas fa-quote-right"></i>
          </div>
        </div>}
    end

  end
end

Liquid::Template.register_tag('quote', Jekyll::Quote)
