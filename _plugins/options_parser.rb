module Jekyll
  class OptionParser
    OPTIONS_SYNTAX = %r!([^\s]+)\s*=\s*['"]+([^'"]+)['"]+!

    class << self
      def parse(raw_options, allowed_attributes, allowed_properties)
        options = {
          attributes: {},
          properties: []
        }
        raw_options.strip.split(' ').each do |op|
          if op.match(OPTIONS_SYNTAX)
            attribute = op.scan(OPTIONS_SYNTAX).map { |k, v| [k.to_sym, v] }.to_h
            key = attribute.keys.first.to_s
            options[:attributes].merge! attribute if allowed_attributes.include?(key)
          else
            options[:properties].push(op.to_sym) if allowed_properties.include?(op)
          end
        end
        options
      end
    end
  end
end
