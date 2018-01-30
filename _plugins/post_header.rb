module Jekyll
  class PostHeader < Liquid::Tag
    def initialize(_, key, _)
      super
      @key = key.strip!
    end

    def render(context)
      # Get the image name
      image_name = lookup(context, @key)
      # Check if the image exists. If not, return default value
      if File.file?('./assets/img/pages/headers/' + image_name.to_s)
        image_name
      else
        'public/default.png'
      end
    end

    def lookup(context, name)
      lookup = context
      name.split('.').each { |value| lookup = lookup[value] }
      lookup
    end
  end
end

Liquid::Template.register_tag('post_header', Jekyll::PostHeader)
