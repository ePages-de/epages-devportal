module CategoryName
  require 'yaml'

  def category_name(input)
    categories = YAML.load_file('_config.yml')['categories']
    categories[input].nil? ? input : categories[input]
  end
end

Liquid::Template.register_filter(CategoryName)
