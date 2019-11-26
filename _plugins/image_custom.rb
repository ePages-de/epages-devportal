module Jekyll
  class ImageCustom < Liquid::Tag

    ALLOWED_ATTRIBUTES = %w(
      image
      width
      align
      caption
    ).freeze

    ALLOWED_PROPERTIES = %w(
      circle
      lightbox
    ).freeze

    DEFAULT_ALIGN = 'center'

    def initialize(_, args, _)
      super
      @args = OptionParser.parse(args, ALLOWED_ATTRIBUTES, ALLOWED_PROPERTIES)
      raise 'ImageCustom: "image" attribute must be provided' if image.nil?
      # raise 'ImageCustom: Image doesn\'t exist' unless File.file?(image)
      raise 'ImageCustom: "width" attribute must be provided' if width.nil?
      raise 'ImageCustom: "width" attribute must be in [5|10|15|20|25|30|35|40|45|50|55|60|65|70|75|80|85|90|95|100]' unless [5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100].include? width.to_i
    end

    def render(context)
      html = "<div class='custom-image  #{align}  #{circle}  custom-image--width-#{width}'>"
      html += %{<a href='#{image}'
                class='#{lightbox}'
                data-lightbox='#{image}'>
                <img class='custom-image__image' src='#{image}' /></a>}
      if @args[:attributes][:caption]
        html += "<div class='custom-image__caption'>#{@args[:attributes][:caption].gsub!('_', ' ')}</div>"
      end
      html += "</div>"
      html
    end

    def align
      'custom-image--' + (@args[:attributes][:align] || DEFAULT_ALIGN)
    end

    def lightbox
      'custom-image__lightbox' if @args[:properties].include? :lightbox
    end

    def image
      @args[:attributes][:image]
    end

    def circle
      'custom-image--circle' if @args[:properties].include? :circle
    end

    def width
      @args[:attributes][:width]
    end
  end
end

Liquid::Template.register_tag('image_custom', Jekyll::ImageCustom)
