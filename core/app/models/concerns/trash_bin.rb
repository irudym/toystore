##
# Trash bin implementation
# every model should have trash:boolean field in schema
# set the field to false by default in DB migration
##
module TrashBin
  module ClassMethods
    def trash_bin
      self.where(trash:true)
    end

    def available
      self.where(trash: false)
    end
  end

  def put_to_trash
    trash = false
    id = self.id
    if self.trash
      destroy
    else
      update(trash:true)
      trash = true
    end
    {id: id, trash: trash}
  end

  def restore
    update(trash:false)
  end

  def self.included(receiver)
    receiver.extend(ClassMethods)
  end

end