require 'colorize'
require 'yaml'

task :test_posts do
  class LinterLine
    attr_reader :file, :raw, :line_num, :content

    def initialize(file, raw, line_num)
      @file = file
      @raw = raw
      @line_num = line_num
      @content = raw.chomp
    end
  end

  class LinterError
    attr_reader :file, :line, :message

    def initialize(file, line, message)
      @file = file
      @line = line
      @message = message
    end
  end

  class Linter
    def initialize(dir, glob, ignore = [])
      @dir = dir
      @glob = glob
      @ignore = ignore
    end

    def run
      errors = []

      puts "Running linter checks on #{@dir} on #{@glob}".blue

      posts = find_posts
      posts.each do |post|
        errors += check_front_matter(post)
      end

      errors.each do |error|
        if error.line
          puts "#{error.file}:#{error.line.line_num} -> #{error.message}".red
        else
          puts "#{error.file} -> #{error.message}".red
        end
      end
      abort if errors.length > 0
    end

    def check_front_matter(post)
      errors = []

      config = YAML.load(File.open('./_config.yml') { |f| f.read })
      categories = config['categories'].keys

      if ['.md'].include? File.extname(post)
        f_m = YAML.load(File.open(post) { |f| f.read }[/---(.*?)---/m, 1])

        if f_m['category'].nil?
          errors << LinterError.new(post, nil, 'Post must have a category')
        else
          unless categories.include? f_m['category']
            errors << LinterError.new(post, nil, 'Post category is not valid')
          end
        end
        if f_m['layout'].nil?
          errors << LinterError.new(post, nil, 'Post must have a layout')
        else
          unless f_m['layout'] == 'post'
            errors << LinterError.new(post, nil, 'Post layout must be "post"')
          end
        end
        if f_m['authors'].nil?
          errors << LinterError.new(post, nil, 'Post must have authors')
        else
          unless f_m['authors'].is_a?(Array)
            errors << LinterError.new(post, nil, 'Post authors must be an Array')
          end
        end
        if f_m['header_image'].nil?
          errors << LinterError.new(post, nil, 'Post must have a header_image')
        else
          unless File.file?('./assets/img/pages/blog/headers/' + f_m['header_image'])
            errors << LinterError.new(post, nil, 'Post header_image doesn\'t exist')
          end
        end
        if !f_m['tags'].nil? && !f_m['tags'].is_a?(Array)
          errors << LinterError.new(post, nil, 'Post tags must be an Array')
        end
        if f_m['date'].nil?
          errors << LinterError.new(post, nil, 'Post must have a date')
        else
          unless (Date.parse(f_m['date']) rescue nil)
            errors << LinterError.new(post, nil, 'Post date is not valid')
          end
        end
        if f_m['title'].nil?
          errors << LinterError.new(post, nil, 'Post must have a title')
        end
        if !f_m['header_position'].nil? && !(['top','center','bottom'].include? f_m['header_position'])
          errors << LinterError.new(post, nil, 'Post header_position must be "top", "center" or "bottom"')
        end
      end
      errors
    end

    def find_posts
      Dir.glob(File.join(@dir, @glob))
         .select { |file| not @ignore.any? { |ign| file.start_with? ign } }
         .select { |file| File.file?(file) }
    end

    def read_file_lines(file)
      File.foreach(file).with_index.map { |raw, line_num| LinterLine.new(file, raw, line_num + 1) }
    end
  end

  Linter.new('./_posts/', '**/*.*', ['./.git', './.sass_cache', './_site/', './_sass/bootstrap/', './_sass/font-awesome/', './assets/fonts', './vendor/', './README.md']).run
end

task :test_files do
  class LinterLine
    attr_reader :file, :raw, :line_num, :content

    def initialize(file, raw, line_num)
      @file = file
      @raw = raw
      @line_num = line_num
      @content = raw.chomp
    end
  end

  class LinterError
    attr_reader :file, :line, :message

    def initialize(file, line, message)
      @file = file
      @line = line
      @message = message
    end
  end

  class Linter
    def initialize(dir, glob, ignore = [])
      @dir = dir
      @glob = glob
      @ignore = ignore
    end

    def run
      errors = []

      puts "Running linter checks on #{@dir} on #{@glob}".blue

      files = find_files
      files.each do |file|
        errors += check_line_endings(file)
        errors += check_trailing_whitespaces(file)
        errors += check_indentation(file)
        errors += check_filename(file)
      end

      errors.each do |error|
        if error.line
          puts "#{error.file}:#{error.line.line_num} -> #{error.message}".red
        else
          puts "#{error.file} -> #{error.message}".red
        end
      end
      abort if errors.length > 0
    end

    def check_line_endings(file)
      errors = []
      if ['.html', '.scss', '.js', '.yml', '.md'].include? File.extname(file)
        lines = read_file_lines(file)
        lines.each do |line|
          if line.raw.end_with? "\r\n"
            errors << LinterError.new(file, line, 'Found windows line ending (CRLF)')
          end

          if line.raw.end_with? "\r"
            errors << LinterError.new(file, line, 'Found old Macintosh line ending (LF)')
          end
        end
      end
      errors
    end

    def check_trailing_whitespaces(file)
      errors = []
      if ['.html', '.scss', '.js', '.yml'].include? File.extname(file)
        lines = read_file_lines(file)
        lines.each do |line|
          if line.content =~ /\s+$/
            errors << LinterError.new(file, line, 'Found trailing whitespaces')
          end
        end
      end
      errors
    end

    def check_indentation(file)
      errors = []
      if ['.html', '.scss', '.js', '.yml', '.md', '.rb'].include? File.extname(file)
        lines = read_file_lines(file)
        lines.each do |line|
          if line.content =~ /^\s*\t+\s*/
            errors << LinterError.new(file, line, 'Contains tabs in indentation')
          end
        end
      end
      errors
    end

    def check_filename(file)
      errors = []
      unless file =~ /^[a-z0-9\-\_\.\/]+$/
        errors << LinterError.new(file, nil, 'Filenames must only contain lower case letters, numbers, dashes, underscores or points')
      end
      errors
    end

    def find_files
      Dir.glob(File.join(@dir, @glob))
         .select { |file| not @ignore.any? { |ign| file.start_with? ign } }
         .select { |file| File.file?(file) }
    end

    def read_file_lines(file)
      File.foreach(file).with_index.map { |raw, line_num| LinterLine.new(file, raw, line_num + 1) }
    end
  end

  Linter.new('.', '*/**/*.*', ['./.git', './.sass_cache', './_site/', './_sass/bootstrap/', './_sass/font-awesome/', './assets/fonts', './vendor/', './README.md']).run
end

task :test_html do
  require 'html-proofer'

  ignore = []

  options = { disable_external: true,
              file_ignore: ignore,
              empty_alt_ignore: true,
              check_html: true }

  sh 'bundle exec jekyll build'

  HTMLProofer.check_directory('./_site', options).run
end
