# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_02_19_201804) do

  create_table "active_storage_attachments", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "admins", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.bigint "user_id"
    t.integer "level"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_admins_on_user_id"
  end

  create_table "brands", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.string "name"
    t.string "name_eng"
    t.text "description"
    t.boolean "trash", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "image_id"
    t.index ["image_id"], name: "index_brands_on_image_id"
  end

  create_table "categories", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.string "name"
    t.string "name_eng"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "trash", default: false
  end

  create_table "colours", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.string "name"
    t.string "name_eng"
    t.string "hex"
    t.boolean "trash", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "colours_products", id: false, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.integer "colour_id"
    t.integer "product_id"
    t.index ["colour_id"], name: "index_colours_products_on_colour_id"
    t.index ["product_id"], name: "index_colours_products_on_product_id"
  end

  create_table "images", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
  end

  create_table "images_products", id: false, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.integer "image_id"
    t.integer "product_id"
    t.index ["image_id"], name: "index_images_products_on_image_id"
    t.index ["product_id"], name: "index_images_products_on_product_id"
  end

  create_table "materials", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.string "name"
    t.string "name_eng"
    t.text "description"
    t.boolean "trash", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "materials_products", id: false, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.integer "material_id"
    t.integer "product_id"
    t.index ["material_id"], name: "index_materials_products_on_material_id"
    t.index ["product_id"], name: "index_materials_products_on_product_id"
  end

  create_table "products", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.string "name"
    t.string "name_eng"
    t.text "description"
    t.bigint "category_id"
    t.boolean "trash", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "brand_id"
    t.index ["brand_id"], name: "index_products_on_brand_id"
    t.index ["category_id"], name: "index_products_on_category_id"
  end

  create_table "products_types", id: false, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.integer "type_id"
    t.integer "product_id"
    t.index ["product_id"], name: "index_products_types_on_product_id"
    t.index ["type_id"], name: "index_products_types_on_type_id"
  end

  create_table "types", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.string "name"
    t.string "name_eng"
    t.text "description"
    t.boolean "trash", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "admins", "users"
  add_foreign_key "products", "brands"
  add_foreign_key "products", "categories"
end
