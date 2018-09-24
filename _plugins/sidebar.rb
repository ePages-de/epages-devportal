module Jekyll
  class Sidebar < Liquid::Tag
    def initialize(tag_name, data, tokens)
      super
      @data = data.strip + '.yml'
    end

    def render(context)
      @context = context
      entries = YAML.load_file('_data/' + @data)

      @result = ""

      loop_entries(entries)
    end

    def loop_entries(entries)
      @result += "<ul class='#{@result.empty? ? 'sidebar' : 'sidebar__section'}'>"
      entries.each do |entry|
        if entry['entries'].nil?
          page = @context.registers[:site].pages.detect { |p| p.path == entry['link'] }
          @result += "<li class='sidebar__link'><a href='#{page.permalink || page.url}'>#{entry['title']}</a></li>"
        else
          @result += "<li class='sidebar__button'>#{entry['title']}<i class='fas fa-caret-down sidebar__arrow'></i></li>"
          loop_entries(entry['entries'])
        end
      end
      @result += "</ul>"
    end
  end
end

Liquid::Template.register_tag('sidebar', Jekyll::Sidebar)
