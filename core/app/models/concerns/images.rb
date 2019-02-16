module Images
  # returns object with IO and filename
  def from_base64(data, name)
    regexp = /\Adata:([-\w]+\/[-\w\+\.]+)?;base64,(.*)/m
    image_uri_parts = data.match(regexp) || []
    extension = MIME::Types[image_uri_parts[1]].first.preferred_extension
    file_name = "#{name}.#{extension}"
    {io: StringIO.new(Base64.decode64(image_uri_parts[2])), filename: file_name}
  end
end