module Pages
  module ClassMethods
    ##
    # provide records split by 50 items per page
    # the first page starts from 1
    ##
    def to_page(index = 1, trash = false)
      index += 1 if index == 0
      records = self.where(trash: trash).select('*').offset((index - 1) * 50).limit(50)
      count = self.where(trash: trash).count
      {
          page: index,
          pages: (count/50).to_int + 1,
          "#{self.name.downcase.pluralize}": records
      }
    end

    def to_pages(index = 1)
      self.to_page index
    end

    def to_trash_pages(index = 1)
      self.to_page index, true
    end
  end

  def self.included(receiver)
    receiver.extend ClassMethods
  end
end