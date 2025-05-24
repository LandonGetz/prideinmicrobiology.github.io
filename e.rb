require 'metainspector'

url = ARGV[0]

if url
  page = MetaInspector.new(url)

  url = page.url
  title = page.title&.strip || "Link"
  desc = page.best_description&.strip || page.description&.strip || "No description available"

  # Escape any quotes in title and description
  title = title.gsub('"', '&quot;')
  desc = desc.gsub('"', '&quot;')

  puts %|
{% include link.html
  title="#{title}"
  description="#{desc}"
  link="#{url}"
%}|
else
  puts "[ERROR] No URL found. Usage: ruby e.rb <URL>"
  exit -1
end
