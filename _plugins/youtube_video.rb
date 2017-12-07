module Jekyll
  class YoutubeVideo < Liquid::Tag
    VIDEO_CODE_RE = /^\s*([^\s]+)(\s+(\d+)\s+(\d+)\s*)?/

    ALLOWED_ATTRIBUTES = %w(
      video_id
      width
      height
    ).freeze

    DEFAULT_WIDTH  = 560
    DEFAULT_HEIGHT = 315

    def initialize(_, args, _)
      super
      @args = OptionParser.parse(args, ALLOWED_ATTRIBUTES)
      raise 'YoutubeVideo: "video_id" attribute must be provided' if video_id.nil?
    end

    def render(context)
      "<div class='youtube-video'>
         <iframe width='#{width}'
                 height='#{height}'
                 src='https://www.youtube.com/embed/#{video_id}'
                 frameborder='0'
                 allowfullscreen>
         </iframe>
       </div>"
    end

    def video_id
      @args[:attributes][:video_id]
    end

    def width
      @args[:attributes][:width] || DEFAULT_WIDTH
    end

    def height
      @args[:attributes][:height] || DEFAULT_HEIGHT
    end
  end
end

Liquid::Template.register_tag('youtube_video', Jekyll::YoutubeVideo)
