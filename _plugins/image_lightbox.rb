module Jekyll
  class ImageLightbox < Liquid::Tag

    ALLOWED_ATTRIBUTES = %w(
      image
      align
    ).freeze

    def initialize(_, args, _)
      super
      @args = OptionParser.parse(args, ALLOWED_ATTRIBUTES)
      raise 'ImageLightbox must have an "image" attribute' if @args[:image].nil?
    end

    def render(context)
      %{<a href='/assets/img/blog/images/#{@args[:image]}'
           class='image-lightbox'
           data-lightbox='#{@args[:image]}'
           style='background: url(/assets/img/blog/images/#{@args[:image]}); background-position: center #{@args[:align]};'>
           <span class='card image-lightbox__button'>See Full Image</span></a>}
    end
  end
end

Liquid::Template.register_tag('image_lightbox', Jekyll::ImageLightbox)
