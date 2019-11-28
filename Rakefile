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
        errors += check_for_internal_urls(post)
        errors += check_for_external_urls(post)
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

      categories = YAML.load(File.open('./_config.yml') { |f| f.read })['category_list'].keys
      authors = YAML.load(File.open('./_data/authors.yml') { |f| f.read }).map(&:first).map(&:last)

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
        unless f_m['about_authors'].nil?
          unless f_m['about_authors'].is_a?(Array)
            errors << LinterError.new(post, nil, 'Post about_authors must be an Array')
          end
          unless (f_m['about_authors'] - authors).empty?
            errors << LinterError.new(post, nil, 'Post about_authors ids must exist on \'_data/authors.yml\'')
          end
        end
        if f_m['header_image'].nil?
          errors << LinterError.new(post, nil, 'Post must have a header_image')
        else
          unless File.file?('./assets/img/pages/headers/' + f_m['header_image'])
            errors << LinterError.new(post, nil, 'Post header_image doesn\'t exist')
          end
        end
        if !f_m['tags'].nil? && !f_m['tags'].is_a?(Array)
          errors << LinterError.new(post, nil, 'Post tags must be an Array')
        end
        if f_m['date'].nil?
          errors << LinterError.new(post, nil, 'Post must have a date')
        else
          unless (Date.strptime(f_m['date'].to_s, '%Y-%m-%d') rescue nil)
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

    def check_for_internal_urls(file)
      errors = []
      if ['.md'].include? File.extname(file)
        lines = read_file_lines(file)
        lines.each do |line|
          if line.content =~ /(\[.*\]\(.*developer.epages.com[^ {}\(\)]+\))/
            errors << LinterError.new(file, line, 'Linking to an internal URL. Use relative path')
          end
        end
      end
      errors
    end

    def check_for_external_urls(file)
      errors = []
      if ['.md'].include? File.extname(file)
        lines = read_file_lines(file)
        lines.each do |line|
          if line.content =~ /(\[.*?\]\(https?(?!.*developer.epages.com.*)[^ {}\(\)]+\)(?!{:target="_blank"}))/
            errors << LinterError.new(file, line, 'Linking to an external URL without using {:target="_blank"}')
          end
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

  Linter.new('./_posts/', '**/*.*').run
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

      errors += check_sidebar('_data/beyond_essence.yml')

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

    def check_sidebar(file)
      errors = []

      # Check if it's a valid yaml file
      begin
        YAML.parse(File.open(file))
      rescue
        errors << LinterError.new(file, nil, 'Not a valid YAML format')
      end

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

  Linter.new('.', '*/**/*.*', ['./_site',
                               './.bundle',
                               './.git',
                               './.sass_cache',
                               './.tweet-cache',
                               './assets/font-awesome',
                               './assets/fonts',
                               './vendor']).run
end

task :test_html do
  require 'html-proofer'

  url_ignore = [/.*apps.*/,
                /.*signup/,
                /.*terms-and-conditions.*/,
                /.*beyond-docs.*/]

  options = { disable_external: true,
              url_ignore: url_ignore,
              empty_alt_ignore: true,
              check_html: true,
              allow_hash_href: true }

  HTMLProofer.check_directory('./_site', options).run
end

task :test do
  sh 'bundle exec jekyll build'

  sh 'rake test_ci'
end

task :test_ci do
  sh 'rake test_html'
  sh 'rake test_files'
  sh 'rake test_posts'
end

task :write do
  write_file  = '_config_write.yml'
  date_from   = Date.new(2015)
  date_to     = Date.today.prev_month.prev_month

  File.delete(write_file) if File.exist?(write_file)

  File.new(write_file, 'w')

  exclude = { 'exclude' => YAML.load_file('_config.yml')['exclude'],
              'sass' => { 'sass_dir' => '_sass',
                          'style' => 'expanded' } }

  exclude['exclude'].push '_pages/categories/'
  exclude['exclude'].push '_pages/api/categories/'
  exclude['exclude'].push '_pages/404.html'
  exclude['exclude'].push '_pages/about.md'
  exclude['exclude'].push '_pages/devjobs.html'
  exclude['exclude'].push '_pages/index.html'
  exclude['exclude'].push '_pages/search.html'
  exclude['exclude'].push '_pages/terms-and-conditions.md'
  exclude['exclude'].push *(date_from.year..date_to.prev_year.year).map { |d| "_posts/#{d}" }.uniq
  exclude['exclude'].push *(Date.new(date_to.year)..date_to).map { |d| "_posts/#{d.year}/#{d.year}-#{'%02d' % d.month}-*" }.uniq

  File.open(write_file, 'w+') { |f| f.puts exclude.to_yaml }

  sh 'bundle exec jekyll serve --config _config.yml,_config_write.yml --host 0.0.0.0'
end
