module Jekyll
  class ImageLightbox < Liquid::Tag

    ALLOWED_ATTRIBUTES = %w(
      image
      align
    ).freeze

    def initialize(_, args, _)
      super
      @args = OptionParser.parse(args, ALLOWED_ATTRIBUTES)
      raise 'ImageLightbox: "image" attribute must be provided' if @args[:attributes][:image].nil?
      # raise 'ImageLightbox: Image doesn\'t exist' unless File.file?(@args[:attributes][:image])
    end

    def render(context)
      %{<a href='#{@args[:attributes][:image]}'
           class='image-lightbox'
           data-lightbox='#{@args[:attributes][:image]}'
           style='background: url(#{@args[:attributes][:image]}); background-position: center #{@args[:attributes][:align]};'>
           <span class='card image-lightbox__button'>See Full Image</span></a>}
    end
  end
end

Liquid::Template.register_tag('image_lightbox', Jekyll::ImageLightbox)
