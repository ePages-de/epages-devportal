module Jekyll
  class OptionParser
    OPTIONS_SYNTAX = %r!([^\s]+)\s*=\s*['"]+([^'"]+)['"]+!

    class << self
      def parse(raw_options, allowed_attributes)
        options = {}
        raw_options.scan(OPTIONS_SYNTAX).each do |key, value|
          if allowed_attributes.include?(key)
            options[key.to_sym] = value
          end
        end
        options
      end
    end
  end
end
