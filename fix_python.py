import os

dir_path = 'd:/server-vaidik/web-vaidik-main/src/app/(main)/book-a-puja'

for root, _, files in os.walk(dir_path):
    for file in files:
        if file == 'page.tsx' and 'book-a-puja\\page.tsx' not in os.path.join(root, file):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            # Fix 1: The broken comment in text testimonials
            bad_str_1 = '''              </div>
            
            </div> — Shorts style, no bg card */}'''
            
            good_str_1 = '''              </div>
            ))}
          </div>
          </div>

          {/* Video Testimonials — Shorts style, no bg card */}'''
          
            content = content.replace(bad_str_1, good_str_1)

            bad_str_1_alt = '''              </div>
            </div> — Shorts style, no bg card */}'''
            content = content.replace(bad_str_1_alt, good_str_1)

            # Fix 2: The broken video array map closing
            bad_str_2 = '''              </div>
            ))}
            </div>
                  ))}
                </div>
              </div>
            </div>
          )}'''
            
            good_str_2 = '''                </div>
              ))}
            </div>
          </div>'''
          
            content = content.replace(bad_str_2, good_str_2)
            
            # Dynamic page
            bad_str_3 = '''              </div>
            
            </div> (Dynamic) */}'''
            good_str_3 = '''              </div>
            ))}
          </div>
          </div>

          {/* Video Testimonials (Dynamic) */}'''
            content = content.replace(bad_str_3, good_str_3)
            
            bad_str_4 = '''              </div>
            ))}
            </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
      )}

      {/* 6.5 PHOTO GALLERY (Dynamic) */}'''
            good_str_4 = '''                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6.5 PHOTO GALLERY (Dynamic) */}'''
            content = content.replace(bad_str_4, good_str_4)

            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

print("Python fix done!")
