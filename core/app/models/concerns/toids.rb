module Toids
  def to_ids(type = nil)
    if type
    send(type).map(&:id)
    else
      id
    end
  end
end