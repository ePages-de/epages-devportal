module Jekyll
  class Quote < Liquid::Tag

    ALLOWED_ATTRIBUTES = %w(
      text
    ).freeze

    def initialize(_, args, _)
      super
      @args = OptionParser.parse(args, ALLOWED_ATTRIBUTES)
      raise 'Quote: "text" attribute must be provided' if @args[:attributes][:text].nil?
    end

    def render(context)
      %{<div class="quote">
          <div class="quote__text">
            #{@args[:attributes][:text].tr('_', ' ')}
            <i class="quote__icon quote__icon--left fas fa-quote-left"></i>
            <i class="quote__icon quote__icon--right fas fa-quote-right"></i>
          </div>
        </div>}
    end
  end
end

Liquid::Template.register_tag('quote', Jekyll::Quote)
